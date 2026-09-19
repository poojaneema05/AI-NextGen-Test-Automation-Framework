# AI NextGen Test Automation Framework

A scalable, reusable test automation framework built with **TypeScript, Playwright, Cucumber, and Appium**, designed to support modern **Web, API, Mobile, AI-driven, and event-driven testing**.

The framework follows a layered architecture that separates test cases, fixtures, business-level services, drivers, configuration, test data, and common utilities.

---

## 🚀 Current Status

### Implemented

* ✅ Web UI automation with Playwright
* ✅ BDD automation with Cucumber
* ✅ TypeScript-based framework architecture
* ✅ Environment-aware configuration
* ✅ Reusable browser management
* ✅ Framework context and driver management
* ✅ Centralized logging
* ✅ Framework-level error handling
* ✅ Page Object Model
* ✅ Reusable test data management
* ✅ API automation with Playwright APIRequestContext
* ✅ API service layer
* ✅ API authentication
* ✅ API fixtures
* ✅ API request/response models
* ✅ API CRUD operations
* ✅ Independent and repeatable API tests
* ✅ HTML test reporting

### Planned

* ⏳ Event-driven / asynchronous testing
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
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   Configuration       Logging          Test Data
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                     Test Reports
```

---

# 📁 Project Structure

```text
AI-NextGen-Test-Automation-Framework/
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
│   │   │   │
│   │   │   ├── loginData.json
│   │   │   ├── LoginData.ts
│   │   │   └── TestDataManager.ts
│   │   │
│   │   └── utils/
│   │       ├── DateUtil.ts
│   │       ├── FileUtil.ts
│   │       ├── JsonUtil.ts
│   │       ├── RandomUtil.ts
│   │       ├── ScreenshotUtil.ts
│   │       └── WaitUtil.ts
│   │
│   ├── core/
│   │   │
│   │   ├── api/
│   │   │   ├── ApiAuth.ts
│   │   │   ├── ApiBase.ts
│   │   │   ├── ApiClient.ts
│   │   │   │
│   │   │   ├── models/
│   │   │   │   ├── ApiAuthRequest.ts
│   │   │   │   ├── ApiAuthResponse.ts
│   │   │   │   ├── CreateBookingRequest.ts
│   │   │   │   ├── CreateBookingResponse.ts
│   │   │   │   └── UpdateBookingRequest.ts
│   │   │   │
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
│   └── api/
│       ├── api-auth.spec.ts
│       ├── booking-health.spec.ts
│       ├── booking-service.spec.ts
│       ├── create-booking.spec.ts
│       ├── delete-booking.spec.ts
│       └── update-booking.spec.ts
│
├── cucumber.js
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

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

This keeps test scenarios focused on behavior rather than low-level browser implementation.

---

# 🔌 API Automation

The API framework uses **Playwright APIRequestContext** and follows a layered service architecture.

## API Architecture

```text
API Test
   ↓
API Fixture
   ↓
BookingService
   ↓
ApiBase
   ↓
ApiClient
   ↓
ApiAuth
   ↓
REST API
```

### ApiClient

`ApiClient` centralizes HTTP mechanics.

Supported operations:

```text
GET
POST
PUT
PATCH
DELETE
```

Business-specific API logic does not belong in `ApiClient`.

---

## ApiBase

`ApiBase` provides common functionality to API service classes.

This allows individual services to focus on business operations rather than HTTP infrastructure.

---

## BookingService

`BookingService` contains booking-specific operations:

```text
getBooking()
createBooking()
updateBooking()
deleteBooking()
```

This creates a clean separation between:

**HTTP mechanics**

and

**business-level API operations**

---

# 🔐 API Authentication

Protected API operations use a reusable authentication layer.

Authentication flow:

```text
Credentials
    ↓
ApiAuth
    ↓
POST /auth
    ↓
Authentication Token
    ↓
ApiClient
    ↓
Cookie: token=<token>
```

Authentication is handled by the framework rather than individual test cases.

This allows protected operations such as:

* PUT
* DELETE
* future protected endpoints

to reuse the same authentication mechanism.

---

# 🧪 API Test Coverage

The current API suite contains six tests.

### 1. Authentication

Verifies that the framework can authenticate with the API and retrieve a token.

### 2. Health Check

Verifies API availability using:

```text
GET /ping
```

### 3. Get Booking

Creates test data and retrieves the newly created booking.

### 4. Create Booking

Creates a new booking and validates the response.

### 5. Update Booking

Creates a booking, updates it, validates the update response, and retrieves the booking again to verify persistence.

```text
CREATE
  ↓
UPDATE
  ↓
VERIFY RESPONSE
  ↓
GET
  ↓
VERIFY PERSISTED DATA
```

### 6. Delete Booking

Creates a booking, deletes it, and verifies that the resource is no longer available.

```text
CREATE
  ↓
DELETE
  ↓
GET
  ↓
404
```

---

# ♻️ Test Independence

API tests are designed to avoid dependency on shared hard-coded booking IDs.

Instead of relying on:

```typescript
const bookingId = 1;
```

tests create their own data and use the generated booking ID.

Example:

```text
Create booking
      ↓
Capture bookingid
      ↓
Use bookingid
      ↓
Update / Delete / Verify
```

This improves:

* Test repeatability
* Test isolation
* Parallel execution readiness
* Reliability
* Maintainability

---
### API Assertions

Common HTTP-level validations are centralized in `ApiAssertions` to keep
individual API tests focused on business behavior rather than repeating
framework-level validation logic.

Current capabilities include:

- Expected HTTP status validation
- Successful response validation
- Consistent framework error handling
- API validation logging

Location:

```text
src/core/api/ApiAssertions.ts
# 📦 Test Data Management

API test data is separated from test logic.

Example:

```text
BookingTestData
      │
      ├── validBooking()
      │
      └── updatedBooking()
```

This keeps test cases focused on validation while allowing reusable data definitions.

---

### Typed API Responses

API service methods can return a typed `ApiResponse<T>` wrapper that preserves
both the raw HTTP response and the deserialized response body.

This allows tests to validate protocol-level behavior and business-level data
independently.

Example structure:

```text
ApiResponse<T>
├── response → HTTP status, headers, and response metadata
└── body     → typed API response model

The current implementation uses this pattern for booking creation.

Location:

src/core/api/models/ApiResponse.ts

This separation keeps transport concerns available to the test layer while
maintaining strongly typed response models for business validation.


After saving the README, **we're done with this change**.

### Current API foundation

- ✅ Authentication
- ✅ API client
- ✅ API fixtures
- ✅ Service layer
- ✅ Request/response models
- ✅ CRUD operations
- ✅ Independent tests
- ✅ Reusable API assertions
- ✅ Typed API responses
- ✅ Logging/error handling
- ✅ README documentation
- ✅ **6/6 tests passing**

**Next after this:** I recommend **negative API testing and standardized error-response validation**. That will make the API layer look much more like a production-grade QE framework rather than just a CRUD test suite.
Ad

# 🧩 Fixtures

The API fixture provides reusable services to tests.

```text
Test
 ↓
api.fixture
 ↓
ApiClient
 ↓
BookingService
```

The fixture is responsible for creating and cleaning up the API client lifecycle.

Tests therefore don't need to manually create or dispose API request contexts.

---

# 📊 Reporting

The framework currently supports:

* Playwright HTML reports
* Console/list reporting
* Screenshots on failure
* Video retention on failure
* Trace collection on retry

HTML report:

```bash
npx playwright show-report
```

---

# ▶️ Running the Tests

## Install dependencies

```bash
npm install
```

## Run all Playwright tests

```bash
npx playwright test
```

## Run API tests

```bash
npx playwright test tests/api
```

## Run a specific API test

```bash
npx playwright test tests/api/create-booking.spec.ts
```

## Run TypeScript compilation

```bash
npx tsc --noEmit
```

## Run the HTML report

```bash
npx playwright show-report
```

---

# 🌎 Environment Configuration

The framework supports environment-aware configuration.

Current environments include:

```text
qa
stage
```

Environment configuration controls values such as:

```text
Application Base URL
API Base URL
Browser configuration
Environment-specific settings
```

This allows the same automation code to execute against different environments without changing test logic.

---

# 🛠️ Technology Stack

| Area                 | Technology                       |
| -------------------- | -------------------------------- |
| Language             | TypeScript                       |
| Web Automation       | Playwright                       |
| BDD                  | Cucumber                         |
| API Automation       | Playwright APIRequestContext     |
| Mobile               | Appium                           |
| Test Runner          | Playwright Test                  |
| Reporting            | Playwright HTML / Allure         |
| CI/CD                | Planned                          |
| AI                   | Planned                          |
| Event-driven Testing | Planned                          |
| Cloud                | AWS / Cloud integrations planned |

---

# 🗺️ Framework Roadmap

## Phase 1 — Core Infrastructure

* Environment configuration
* Browser Factory
* Framework Context
* Driver Manager
* Centralized Logger
* Framework Error handling

## Phase 2 — Web Framework

* Base Page
* Page Objects
* Fixtures
* Test Data Manager

## Phase 3 — API Framework

* API Client
* API authentication
* API fixtures
* API service layer
* API models
* CRUD automation
* Test data management

### Phase 3 Extension — Event-Driven Testing

Planned support for:

* Event abstraction
* Event producers
* Event consumers
* Asynchronous/eventual waits
* Event validation
* Distributed-system testing

Potential technologies include:

```text
Kafka
AWS SQS/SNS
AWS EventBridge
RabbitMQ
Azure Service Bus
WebSockets
```

## Phase 4 — Mobile

* Appium Driver
* Mobile Driver Manager
* Mobile Context
* Mobile Fixtures
* Mobile Page Objects

## Phase 5 — AI-Driven Quality Engineering

Planned capabilities:

* AI service abstraction
* AWS Bedrock integration
* LLM-generated test scenarios
* AI-assisted test analysis
* Self-healing automation
* Defect analysis
* Defect prediction
* AI-assisted visual and accessibility testing

## Phase 6 — CI/CD & Enterprise Capabilities

* Advanced reporting
* Screenshots and traces
* CI/CD pipelines
* Parallel execution
* Framework documentation
* Quality dashboards

---

# 🎯 Design Principles

The framework is designed around several core principles:

### Separation of Concerns

Tests should describe **what is being validated**, not how the underlying infrastructure works.

### Reusability

Common capabilities such as authentication, API communication, browser management, logging, and test data should be reusable across tests.

### Maintainability

Business behavior belongs in service/page classes rather than test cases.

### Test Independence

Tests should create and manage their own data wherever practical.

### Scalability

The architecture is designed to expand from UI automation into:

```text
Web
API
Mobile
Event-driven systems
AI-driven testing
CI/CD
```

### Quality Engineering

The framework is intended to support quality as an engineering capability rather than treating testing as a final verification phase.

---

# 📌 Current API Validation

Current API test execution:

```text
6 API tests
6 passed
0 failed
```

The API framework currently provides a working foundation for authenticated CRUD API automation.

---

# 👩‍💻 Author

**Pooja Neema**

Senior Quality Engineering Leader

Focus areas:

* Quality Engineering
* Test Automation
* Test Architecture
* API Automation
* CI/CD Quality
* AI-driven Testing
* Distributed Systems
* Engineering Quality Strategy
