import { AIProvider } from "../providers/AIProvider";
import { FailureAnalysisPrompt } from "../prompts/FailureAnalysisPrompt";
import { FrameworkError } from "@common/errors/FrameworkError";
import {
    FailureAnalysisResult,
    FailureAnalysisResultSchema
} from "./FailureAnalysisResult";
import { FailureAnalysisRequest } from "./FailureAnalysisRequest";

/**
 * Coordinates AI-powered analysis of test failures.
 *
 * FailureAnalyzer intentionally knows nothing about a specific AI vendor.
 * It depends only on the AIProvider contract.
 *
 * Responsibilities:
 *
 * 1. Convert framework failure information into an AI prompt.
 * 2. Send the prompt through the injected AIProvider.
 * 3. Parse the provider response.
 * 4. Validate the response using the Zod schema.
 * 5. Convert low-level parsing/validation failures into FrameworkError.
 * 6. Return a trusted FailureAnalysisResult to the framework.
 *
 * Provider-specific responsibilities such as authentication,
 * HTTP communication, model selection, and provider response
 * handling belong inside individual AIProvider implementations.
 */
export class FailureAnalyzer {

    constructor(
        private readonly provider: AIProvider
    ) {}

    /**
     * Analyzes a test failure using the configured AI provider.
     *
     * AI output is treated as untrusted external data. The response
     * must successfully pass both JSON parsing and Zod validation
     * before it can enter the rest of the automation framework.
     *
     * @param request - Failure information collected from the test framework.
     * @returns A validated and structured AI failure analysis.
     * @throws FrameworkError when the AI response cannot be parsed
     *         or does not satisfy the expected schema.
     */
    async analyze(
        request: FailureAnalysisRequest
    ): Promise<FailureAnalysisResult> {

        const prompt = FailureAnalysisPrompt.build(request);

        let rawResponse: string;

        try {
            rawResponse =
                await this.provider.analyze(prompt);
        } catch (error) {
            throw new FrameworkError(
                "AI provider failed while analyzing the test failure.",
                { cause: error }
            );
        }

        let parsedResponse: unknown;

        try {
            parsedResponse =
                JSON.parse(rawResponse);
        } catch (error) {
            throw new FrameworkError(
                "AI provider returned an invalid JSON response.",
                { cause: error }
            );
        }

        try {
            return FailureAnalysisResultSchema.parse(
                parsedResponse
            );
        } catch (error) {
            throw new FrameworkError(
                "AI provider returned a response that does not match the expected failure-analysis schema.",
                { cause: error }
            );
        }
    }

    /**
     * Converts framework failure information into a structured
     * prompt for the AI provider.
     *
     * Keeping prompt construction inside the analyzer ensures that
     * provider implementations remain focused on communicating
     * with the underlying AI service.
     */
    private buildPrompt(
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