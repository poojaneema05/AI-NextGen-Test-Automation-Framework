import "tsconfig-paths/register";

import { defineConfig } from "@playwright/test";


export default defineConfig({

    testDir: "./tests",

    use: {
        trace: "on-first-retry",
    },

});