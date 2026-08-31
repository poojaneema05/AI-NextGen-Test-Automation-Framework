import {
    Before,
    After
} from "@cucumber/cucumber";

import { DriverManager } from "@core/driver/DriverManager";


let driverManager: DriverManager;


Before(async () => {

    driverManager =
        new DriverManager();

    await driverManager.initialize();

    await driverManager.createPage();

});


After(async () => {

    await driverManager.close();

});