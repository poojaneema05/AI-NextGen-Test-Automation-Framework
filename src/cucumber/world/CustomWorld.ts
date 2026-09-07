import {
    World,
    IWorldOptions
} from "@cucumber/cucumber";

import { DriverManager } from "@core/driver/DriverManager";
import { LoginPage } from "@pages/LoginPage";


export class CustomWorld extends World {

    public readonly driverManager: DriverManager;

    public loginPage!: LoginPage;


    constructor(options: IWorldOptions) {

        super(options);

        this.driverManager =
            new DriverManager();
    }


    initializePages(): void {

        this.loginPage =
            new LoginPage(
                this.driverManager.getPage()
            );
    }
}