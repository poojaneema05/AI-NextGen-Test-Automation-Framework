export interface EnvironmentConfig {
    baseUrl: string;
    apiUrl: string;
    browser: "chromium" | "firefox" | "webkit";
    headless: boolean;
}


export const environments: Record<string, EnvironmentConfig> = {

    qa: {
        baseUrl: "https://qa.example.com",
        apiUrl: "https://qa-api.example.com",
        browser: "chromium",
        headless: true
    },

    stage: {
        baseUrl: "https://stage.example.com",
        apiUrl: "https://stage-api.example.com",
        browser: "chromium",
        headless: true
    }
};