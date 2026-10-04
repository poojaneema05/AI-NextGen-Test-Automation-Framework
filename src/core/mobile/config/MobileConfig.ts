/**
 * Defines the configuration required to start a mobile automation session.
 *
 * This model intentionally keeps mobile configuration separate from the
 * Appium driver implementation. The driver layer should consume this
 * configuration rather than owning device-specific settings.
 *
 * This separation allows the framework to support:
 * - Android and iOS
 * - Physical devices and emulators/simulators
 * - Local Appium servers and remote device farms
 * - Future providers such as BrowserStack, Sauce Labs, or LambdaTest
 */
export interface MobileConfig {

    /**
     * Mobile platform under test.
     */
    platformName: "Android" | "iOS";

    /**
     * Human-readable device name.
     *
     * Examples:
     * - Pixel 9
     * - iPhone 17 Pro
     */
    deviceName: string;

    /**
     * Application identifier.
     *
     * For Android this may represent the package/activity.
     * For iOS this may represent the bundle identifier.
     */
    appIdentifier?: string;

    /**
     * Path to the application binary when testing a local application.
     *
     * This is optional because some environments launch an already
     * installed application using its identifier.
     */
    appPath?: string;

    /**
     * Appium server URL.
     *
     * Defaults will be applied by the driver/configuration layer rather
     * than being embedded in individual tests.
     */
    appiumServerUrl: string;

    /**
     * Optional automation engine.
     *
     * Examples:
     * - UiAutomator2 for Android
     * - XCUITest for iOS
     */
    automationName?: string;

    /**
     * Additional Appium capabilities required by a specific device,
     * application, or execution environment.
     *
     * Keeping these extensible prevents the framework from becoming
     * tightly coupled to a fixed set of Appium capabilities.
     */
    capabilities?: Record<string, unknown>;
}