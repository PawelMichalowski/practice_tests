import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

test.describe.only('New Payment', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
        await homePage.clickOnSignIn();
        await loginPage.login('username', 'password');
    })

    test('Should send new payment', async ({ page }) => {
        await page.click('#pay_bills_tab');
        await page.selectOption('#sp_payee', 'apple');
        await page.click('#sp_get_payee_details')
        await page.waitForSelector('#sp_payee_details');
        await page.selectOption('#sp_account', '6');
        await page.type('#sp_amount', '10000');
        await page.type('#sp_date', '2023-02-08');
        await page.type('#sp_description', 'new description');
        await page.click('#pay_saved_payees');

        const alertMessage = await page.locator('#alert_content');
        await expect(alertMessage).toContainText(
            'The payment was successfully submitted.'
        )
    })
})