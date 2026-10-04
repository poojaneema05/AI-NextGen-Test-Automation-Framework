import { Browser } from "webdriverio";

import { MobileConfig } from "@core/mobile/config/MobileConfig";

/**
 * Defines the contract for the framework's mobile driver lifecycle.
 *
 * The interface intentionally exposes only the capabilities required by
 * the framework rather than the implementation details of WebdriverIO
 * or Appium.
 *
 * This abstraction allows the mobile framework to evolve independently
 * from its underlying driver implementation and makes future support
 * for additional mobile execution providers easier.
 */
export interface IMobileDriver {

    /**
     * Starts a mobile automation session using the supplied configuration.
     *
     * The concrete implementation is responsible for translating the
     * framework configuration into the capabilities required by the
     * underlying mobile automation technology.
     */
    start(config: MobileConfig): Promise<Browser>;

    /**
     * Returns the currently active mobile driver.
     *
     * Implementations should fail with a framework-level error when
     * called before a session has been initialized.
     */
    getDriver(): Browser;

    /**
     * Terminates the active mobile automation session.
     *
     * Implementations should safely handle teardown when no active
     * session exists.
     */
    stop(): Promise<void>;
}

