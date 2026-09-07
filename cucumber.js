module.exports = {
    default: {
        paths: [
            "tests/web/features/**/*.feature"
        ],

        requireModule: [
            "tsx"
        ],

        require: [
            "src/cucumber/world/**/*.ts",
            "tests/web/steps/**/*.ts",
            "src/core/hooks/**/*.ts"
        ],

        format: [
            "progress",
            "html:test-results/cucumber-report.html"
        ]
    }
};