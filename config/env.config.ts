export interface EnvironmentConfig {
    baseUrl: string;
    apiUrl: string;
    browser: "chromium" | "firefox" | "webkit";
    headless: boolean;
}


export const environments: Record<string, EnvironmentConfig> = {

    qa: {
        baseUrl: "https://practicetestautomation.com",
        apiUrl: "https://restful-booker.herokuapp.com",
        browser: "chromium",
        headless: true
    },

    stage: {
        baseUrl: "https://practicetestautomation.com",
        apiUrl: "https://restful-booker.herokuapp.com",
        browser: "chromium",
        headless: true
    }
};