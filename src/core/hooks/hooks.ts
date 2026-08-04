import {
Before,
After
} from "@cucumber/cucumber";

import { BaseTest } from "../base/BaseTest";


Before(async()=>{

    await BaseTest.setup();

});


After(async()=>{

    await BaseTest.teardown();

});