import { test, expect } from "@playwright/test";


test("verify homepage", async({page})=>{


await page.goto(
"https://example.com"
);


await expect(page)
.toHaveTitle(/Example/);


});