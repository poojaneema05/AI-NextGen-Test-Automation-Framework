/**
 * Defines the contract between the automation framework
 * and an underlying AI/LLM provider.
 *
 * The framework intentionally does not depend directly on
 * a specific AI vendor such as OpenAI, AWS Bedrock,
 * Azure OpenAI, or Anthropic.
 *
 * Implementations of this interface are responsible for
 * translating framework requests into provider-specific
 * API calls.
 *
 * Examples:
 * - MockAIProvider   -> deterministic provider for unit tests
 * - BedrockAIProvider -> AWS Bedrock implementation
 * - OpenAIProvider   -> OpenAI-compatible implementation
 *
 * Keeping this contract small allows the rest of the framework
 * to remain independent of the selected AI provider.
 */
export interface AIProvider {

    /**
     * Sends an analysis request to the configured AI provider.
     *
     * @param prompt - Instruction/data sent to the AI model.
     * @returns Raw textual response from the AI provider.
     */
    analyze(prompt: string): Promise<string>;
}