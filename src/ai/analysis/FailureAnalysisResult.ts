import { z } from "zod";

/**
 * Defines the categories currently supported by the AI failure-analysis
 * engine.
 *
 * These categories are intentionally broad at this stage. As the AI
 * capabilities mature, we can introduce more specific classifications
 * without changing the overall result contract.
 */
export const FailureClassificationSchema = z.enum([
    "LOCATOR_FAILURE",
    "TIMEOUT",
    "ASSERTION_FAILURE",
    "API_FAILURE",
    "TEST_DATA_FAILURE",
    "ENVIRONMENT_FAILURE",
    "AUTHENTICATION_FAILURE",
    "UNKNOWN"
]);

export type FailureClassification =
    z.infer<typeof FailureClassificationSchema>;

/**
 * Zod schema for the structured result returned by the AI analysis layer.
 *
 * AI responses are untrusted external data. This schema provides a
 * runtime validation boundary between the LLM and the rest of the
 * automation framework.
 */
export const FailureAnalysisResultSchema = z.object({

    /**
     * AI classification of the failure.
     */
    classification: FailureClassificationSchema,

    /**
     * AI-generated explanation of the most probable root cause.
     */
    rootCause: z.string().min(1),

    /**
     * Evidence used by the AI to support its analysis.
     */
    evidence: z.array(z.string()).min(1),

    /**
     * Recommended action for the QE engineer.
     */
    recommendedAction: z.string().min(1),

    /**
     * AI confidence represented as a normalized value between 0 and 1.
     */
    confidence: z.number().min(0).max(1)
});

/**
 * TypeScript representation of a validated AI failure-analysis result.
 *
 * The type is derived from the Zod schema so that compile-time types
 * and runtime validation cannot drift apart.
 */
export type FailureAnalysisResult =
    z.infer<typeof FailureAnalysisResultSchema>;