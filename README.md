# AI NextGen Test Automation Framework

A scalable and reusable test automation framework built with **TypeScript, Playwright, Cucumber, and Appium**, designed to support modern **Web, API, Mobile, AI-driven, and event-driven testing**.

The framework follows a layered architecture that separates test cases, fixtures, business-level services, drivers, configuration, test data, and common utilities.

---

# 🚀 Current Status

## Implemented

* ✅ TypeScript-based framework architecture
* ✅ Web UI automation with Playwright
* ✅ BDD automation with Cucumber
* ✅ Environment-aware configuration
* ✅ Environment-specific configuration loading
* ✅ Secrets management through environment variables
* ✅ Reusable browser management
* ✅ Framework context and driver management
* ✅ Centralized logging
* ✅ Framework-level error handling
* ✅ Page Object Model
* ✅ Reusable test data management
* ✅ API automation with Playwright APIRequestContext
* ✅ API client layer
* ✅ API service layer
* ✅ API authentication
* ✅ API fixtures
* ✅ Typed API request/response models
* ✅ Typed API response wrapper
* ✅ API CRUD operations
* ✅ Reusable API assertions
* ✅ Independent and repeatable API tests
* ✅ Generic retry utility with configurable exponential backoff
* ✅ Eventual-consistency polling utility
* ✅ Polling timeout and error handling
* ✅ Focused utility-level test coverage
* ✅ HTML test reporting

## Planned

* ⏳ Event-driven testing abstraction
* ⏳ Event producers and consumers
* ⏳ Kafka / AWS messaging integrations
* ⏳ Appium mobile automation
* ⏳ AI service abstraction
* ⏳ AWS Bedrock integration
* ⏳ AI-powered test analysis
* ⏳ Auto-healing capabilities
* ⏳ AI-based defect analysis and prediction
* ⏳ Advanced reporting
* ⏳ CI/CD integration
* ⏳ Parallel execution enhancements

---

# 🏗️ Framework Architecture

The framework uses a layered architecture designed to keep test logic separate from infrastructure and implementation details.

```text
                         TESTS

                           │

              ┌────────────┼────────────┐

              │            │            │

             WEB          API         MOBILE

              │            │            │

              ▼            ▼            ▼

         Page Objects   Services     Mobile POs

              │            │            │

              ▼            ▼            ▼

           Fixtures     API Base     Fixtures

              │            │            │

              │         ApiClient     Appium

              │            │            │

              │         ApiAuth       Driver

              │            │            │

              └────────────┼────────────┘

                           │

                    Framework Core

                           │

        ┌──────────────────┼──────────────────┐

        │                  │                  │

   Configuration        Logging          Test Data

        │                  │                  │

        └──────────────────┼──────────────────┘

                           │

                      Test Reports
```

The architecture is intentionally designed so that business-level tests remain independent of low-level implementation details.

---

# 📁 Project Structure

```text
AI-NextGen-Test-Automation-Framework/

│

├── config/

│   ├── config.manager.ts

│   ├── env.config.ts

│   └── secrets.config.ts

│

├── src/

│   │

│   ├── ai/

│   │

│   ├── common/

│   │   ├── errors/

│   │   │   └── FrameworkError.ts

│   │   │

│   │   ├── logger/

│   │   │   └── Logger.ts

│   │   │

│   │   ├── testdata/

│   │   │   ├── api/

│   │   │   │   └── BookingTestData.ts

│   │   │   ├── loginData.json

│   │   │   ├── LoginData.ts

│   │   │   └── TestDataManager.ts

│   │   │

│   │   └── utils/

│   │       ├── DateUtil.ts

│   │       ├── FileUtil.ts

│   │       ├── JsonUtil.ts

│   │       ├── RandomUtil.ts

│   │       ├── RetryUtil.ts

│   │       ├── PollingUtil.ts

│   │       ├── ScreenshotUtil.ts

│   │       └── WaitUtil.ts

│   │

│   ├── core/

│   │   ├── api/

│   │   │   ├── ApiAssertions.ts

│   │   │   ├── ApiAuth.ts

│   │   │   ├── ApiBase.ts

│   │   │   ├── ApiClient.ts

│   │   │   ├── models/

│   │   │   │   ├── ApiAuthRequest.ts

│   │   │   │   ├── ApiAuthResponse.ts

│   │   │   │   ├── ApiResponse.ts

│   │   │   │   ├── CreateBookingRequest.ts

│   │   │   │   ├── CreateBookingResponse.ts

│   │   │   │   └── UpdateBookingRequest.ts

│   │   │   └── services/

│   │   │       └── BookingService.ts

│   │   │

│   │   ├── browser/

│   │   │   ├── BrowserFactory.ts

│   │   │   └── PlaywrightManager.ts

│   │   │

│   │   ├── context/

│   │   │   └── FrameworkContext.ts

│   │   │

│   │   ├── driver/

│   │   │   └── DriverManager.ts

│   │   │

│   │   └── hooks/

│   │       └── hooks.ts

│   │

│   ├── cucumber/

│   │   └── world/

│   │       ├── CustomWorld.ts

│   │       └── world.ts

│   │

│   ├── fixtures/

│   │   ├── api.fixture.ts

│   │   └── framework.fixture.ts

│   │

│   └── pageobjects/

│       ├── BasePage.ts

│       ├── HomePage.ts

│       ├── LoginPage.ts

│       └── locators/

│           └── LoginPageLocators.ts

│

├── tests/

│   ├── api/

│   │   ├── api-auth.spec.ts

│   │   ├── booking-health.spec.ts

│   │   ├── booking-service.spec.ts

│   │   ├── create-booking.spec.ts

│   │   ├── delete-booking.spec.ts

│   │   ├── negative-booking.spec.ts

│   │   └── update-booking.spec.ts

│   │

│   └── common/

│       └── polling-util.spec.ts

│

├── .env

├── .env.example

├── .env.qa

├── .env.dev

├── .env.prod

├── .gitignore

├── cucumber.js

├── package.json

├── playwright.config.ts

├── tsconfig.json

└── README.md
```

---

# ⚙️ Configuration and Secrets Management

The framework separates **non-sensitive environment configuration** from **sensitive credentials**.

## Environment Configuration

The active test environment is selected using:

```text
TEST_ENV
```

If `TEST_ENV` is not specified, the framework defaults to:

```text
qa
```

Currently configured environments include:

* `qa`
* `stage`

Environment configuration is maintained in:

```text
config/env.config.ts
```

Current environment settings include:

* Application base URL
* API base URL
* Browser type
* Headless execution mode

## Environment Files

The framework uses `dotenv` to load environment variables.

Environment files include:

```text
.env
.env.qa
.env.dev
.env.prod
.env.example
```

The environment-specific files provide a structure for separating configuration by execution environment.

The `.env.example` file documents required variables without containing real credentials.

Secret-bearing environment files are excluded from source control through `.gitignore`.

## Secrets Management

Sensitive credentials are intentionally separated from `env.config.ts` and application source code.

Current API credentials are supplied through:

```text
BOOKER_USERNAME
BOOKER_PASSWORD
```

Secrets are accessed through:

```text
config/secrets.config.ts
```

`SecretsConfigManager` is responsible for:

* Reading required secrets from environment variables
* Validating required secrets
* Providing typed access to credentials
* Preventing secret values from being written to logs

The API layer does not directly access `process.env`.

Instead:

```text
Environment Variables

        ↓

ConfigManager

        ↓

SecretsConfigManager

        ↓

ApiClient

        ↓

ApiAuth
```

This separation keeps configuration concerns out of business-level API services and prevents credentials from being hardcoded in the automation framework.

**Real credentials must never be committed to Git or stored in source-controlled configuration files.**

---

# 🌐 Web Automation

The framework uses **Playwright** for browser automation and **Cucumber** for BDD-style scenarios.

The Web layer follows the Page Object Model:

```text
Cucumber Feature

       ↓

Step Definition

       ↓

Page Object

       ↓

Playwright

       ↓

Application
```

Common page functionality is centralized in `BasePage`.

Application-specific behavior is implemented in page objects such as:

* `LoginPage`
* `HomePage`

This keeps test scenarios focused on business behavior
