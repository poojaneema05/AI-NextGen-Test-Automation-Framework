import { FailureAnalysisRequest } from "../analysis/FailureAnalysisRequest";

/**
 * Builds the prompt used by the AI failure-analysis capability.
 *
 * Prompt construction is intentionally separated from FailureAnalyzer.
 * This keeps the analyzer focused on orchestration while allowing
 * prompts to evolve independently.
 *
 * Keeping prompts in dedicated modules also makes it easier to:
 *
 * - version prompts
 * - review prompt changes
 * - add prompt-specific tests
 * - support different analysis strategies
 * - reuse prompts across AI providers
 */
export class FailureAnalysisPrompt {

    /**
     * Builds the failure-analysis prompt from framework test evidence.
     *
     * @param request - Failure information collected from the test framework.
     * @returns A structured prompt for the configured AI provider.
     */
    static build(
        request: FailureAnalysisRequest
    ): string {

        return `
Analyze the following automated test failure.

Test Name:
${request.testName}

Test Type:
${request.testType}

Error Message:
${request.errorMessage}

Stack Trace:
${request.stackTrace ?? "Not provided"}

Test File:
${request.testFile ?? "Not provided"}

Expected:
${request.expected ?? "Not provided"}

Actual:
${request.actual ?? "Not provided"}

Metadata:
${JSON.stringify(request.metadata ?? {}, null, 2)}

Return a structured failure analysis containing:
- classification
- rootCause
- evidence
- recommendedAction
- confidence
`;
    }
}