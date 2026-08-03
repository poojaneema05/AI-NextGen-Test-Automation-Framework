import {
Before,
After
} from "@cucumber/cucumber";

import { BaseTest } from "../base/base.test";


Before(async()=>{

    await BaseTest.setup();

});


After(async()=>{

    await BaseTest.teardown();

});