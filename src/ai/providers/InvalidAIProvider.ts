
import { AIProvider } from "./AIProvider";

/**
 * Test-only provider that returns intentionally invalid AI responses.
 *
 * Accepting a configurable response lets us test different failure
 * scenarios without making network calls or using real AI credentials.
 *
 * Examples include malformed JSON, missing fields, unsupported
 * classifications, and invalid confidence values.
 */
export class InvalidAIProvider implements AIProvider {

    /**
     * The response returned by this test provider.
     * Defaults to malformed JSON for backward compatibility.
     */
    constructor(
        private readonly response: string = "{ invalid-json-response"
    ) {}

    /**
     * Returns the configured response without modifying it.
     * FailureAnalyzer is responsible for parsing and validating it.
     */
    async analyze(_prompt: string): Promise<string> {
        return this.response;
    }
}