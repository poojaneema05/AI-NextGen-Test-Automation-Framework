
import { test, expect } from "@playwright/test";
import { FrameworkError } from "@common/errors/FrameworkError";
import { FailureAnalyzer } from "@ai/analysis/FailureAnalyzer";
import { MockAIProvider } from "@ai/providers/MockAIProvider";
import { InvalidAIProvider } from "@ai/providers/InvalidAIProvider";

/**
 * Verifies that FailureAnalyzer can process a valid structured
 * response from an AI provider and return a validated result.
 */
test("should analyze a test failure using the AI provider", async () => {
    const provider = new MockAIProvider();
    const analyzer = new FailureAnalyzer(provider);

    const result = await analyzer.analyze({
        testName: "Reject invalid API credentials",
        testType: "API",
        errorMessage:
            "TypeError: Cannot read properties of undefined (reading 'toThrow')",
        stackTrace: "tests/api/api-auth.spec.ts:42:22",
        testFile: "tests/api/api-auth.spec.ts",
        expected: "Authentication request should be rejected",
        actual: "Assertion chain failed before API response validation",
        metadata: {
            environment: "qa",
            endpoint: "https://restful-booker.herokuapp.com/auth"
        }
    });

    expect(result.classification).toBe("ASSERTION_FAILURE");
    expect(result.rootCause).toBeTruthy();
    expect(result.evidence.length).toBeGreaterThan(0);
    expect(result.recommendedAction).toBeTruthy();
    expect(result.confidence).toBeGreaterThanOrEqual(0);
    expect(result.confidence).toBeLessThanOrEqual(1);
});

/**
 * Verifies that malformed JSON from an AI provider is rejected
 * rather than being accepted as a valid failure-analysis result.
 */
test("should reject malformed AI response", async () => {
    const provider = new InvalidAIProvider();
    const analyzer = new FailureAnalyzer(provider);

    await expect(
        analyzer.analyze({
            testName: "Sample failing test",
            testType: "WEB",
            errorMessage: "Element was not found"
        })
    ).rejects.toBeInstanceOf(FrameworkError);
}
);

/**
 * Verifies that valid JSON with an unsupported classification
 * is rejected by the runtime schema validator.
 */
test("should reject AI responses with an invalid classification", async () => {
    const invalidResponse = JSON.stringify({
        classification: "UNSUPPORTED_FAILURE_TYPE",
        rootCause: "An unexpected failure occurred.",
        evidence: [
            "The test execution reported an error."
        ],
        recommendedAction: "Review the test failure.",
        confidence: 0.85
    });

    const provider = new InvalidAIProvider(invalidResponse);
    const analyzer = new FailureAnalyzer(provider);

    await expect(
        analyzer.analyze({
            testName: "Sample failing test",
            testType: "WEB",
            errorMessage: "Element was not found"
        })
    ).rejects.toBeInstanceOf(FrameworkError);
});