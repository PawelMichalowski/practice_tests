import { test, expect } from '@playwright/test';
import { LoginPage } from '../page/LoginPage';
import { HomePage } from '../page/HomePage';

test.describe.parallel('Login / Logout', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
    })

    test('Negative scenario for login', async ({ page }) => {
        await homePage.clickOnSignIn();
        await loginPage.login('invalid username', 'invalid password');
        await loginPage.assertErrorMessage();
    })

    test('Positive scenario for login and logout', async ({ page }) => {
        await homePage.clickOnSignIn();
        await loginPage.login('username', 'password');

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})
