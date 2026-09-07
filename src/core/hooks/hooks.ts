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


After(async function (this: CustomWorld) {

    await this.driverManager.close();

});