import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

test.describe.only('Trsansfer Funds', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
        await loginPage.login('username', 'password');
    })
})