import { AIProvider } from "./AIProvider";

/**
 * Deterministic AI provider used for framework tests.
 *
 * This implementation intentionally does not call a real LLM.
 * Instead, it returns a predictable structured response.
 *
 * The purpose of this provider is to allow the AI analysis layer
 * to be tested independently from:
 *
 * - network availability
 * - API credentials
 * - model availability
 * - provider rate limits
 * - AI service cost
 *
 * A real provider such as AWS Bedrock can later implement the same
 * AIProvider interface without requiring changes to FailureAnalyzer.
 */
export class MockAIProvider implements AIProvider {

    /**
     * Returns a deterministic JSON response representing an
     * AI-generated failure analysis.
     *
     * The prompt is intentionally accepted even though this mock
     * does not currently interpret it. This keeps the implementation
     * compatible with the same provider contract used by real LLMs.
     */
    async analyze(_prompt: string): Promise<string> {

        return JSON.stringify({
            classification: "ASSERTION_FAILURE",
            rootCause: "The test assertion did not match the observed result.",
            evidence: [
                "The test execution produced an assertion failure."
            ],
            recommendedAction:
                "Review the expected and actual values and verify the assertion logic.",
            confidence: 0.95
        });
    }
}