import {
    World,
    IWorldOptions
} from "@cucumber/cucumber";

import { DriverManager } from "@core/driver/DriverManager";

import { LoginPage } from "@pages/LoginPage";
import { HomePage } from "@pages/HomePage";


export class CustomWorld extends World {

    public readonly driverManager: DriverManager;

    public loginPage!: LoginPage;

    public homePage!: HomePage;


    constructor(options: IWorldOptions) {

        super(options);

        this.driverManager =
            new DriverManager();
    }


    initializePages(): void {

        const page =
            this.driverManager.getPage();


        this.loginPage =
            new LoginPage(page);


        this.homePage =
            new HomePage(page);
    }
}