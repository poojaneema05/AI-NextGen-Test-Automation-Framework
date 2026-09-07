import {
    Before,
    After
} from "@cucumber/cucumber";

import { CustomWorld } from "../../cucumber/world/CustomWorld";


Before(async function (this: CustomWorld) {

    await this.driverManager.initialize();

    await this.driverManager.createPage();

    this.initializePages();

});


After(async function (this: CustomWorld, scenario) {

    if (scenario.result?.status === "FAILED") {

        const page =
            this.driverManager.getPage();

        const screenshot =
            await page.screenshot({
                type: "png"
            });

        await this.attach(
            screenshot,
            "image/png"
        );
    }

    await this.driverManager.close();

});