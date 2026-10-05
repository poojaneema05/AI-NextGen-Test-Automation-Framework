import { test, expect } from "@playwright/test";

import { FailureAnalysisPrompt } from "@ai/prompts/FailureAnalysisPrompt";

/**
 * Verifies that FailureAnalysisPrompt includes the important
 * failure evidence needed by the AI analysis capability.
 *
 * Keeping this test independent from an AI provider allows us
 * to validate prompt construction without network calls,
 * credentials, model availability, or AI cost.
 */
test("should build a failure-analysis prompt from test evidence", () => {

    const prompt = FailureAnalysisPrompt.build({
        testName: "Reject invalid API credentials",

        testType: "API",

        errorMessage:
            "Authentication request returned an unexpected response.",

        stackTrace:
            "tests/api/api-auth.spec.ts:42:22",

        testFile:
            "tests/api/api-auth.spec.ts",

        expected:
            "Authentication request should be rejected",

        actual:
            "Authentication request returned HTTP 200",

        metadata: {
            environment: "qa",
            endpoint: "https://restful-booker.herokuapp.com/auth"
        }
    });

    expect(prompt).toContain(
        "Reject invalid API credentials"
    );

    expect(prompt).toContain(
        "API"
    );

    expect(prompt).toContain(
        "Authentication request returned an unexpected response."
    );

    expect(prompt).toContain(
        "tests/api/api-auth.spec.ts"
    );

    expect(prompt).toContain(
        "Authentication request should be rejected"
    );

    expect(prompt).toContain(
        "Authentication request returned HTTP 200"
    );

    expect(prompt).toContain(
        "qa"
    );

    expect(prompt).toContain(
        "https://restful-booker.herokuapp.com/auth"
    );
});