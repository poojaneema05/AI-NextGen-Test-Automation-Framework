import {
    World,
    IWorldOptions
} from "@cucumber/cucumber";

import { DriverManager } from "@core/driver/DriverManager";


export class CustomWorld extends World {

    public readonly driverManager: DriverManager;


    constructor(options: IWorldOptions) {

        super(options);

        this.driverManager =
            new DriverManager();
    }
}