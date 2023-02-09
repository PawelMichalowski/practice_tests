import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

test.describe('Currency Exchange', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
        await homePage.clickOnSignIn();
        await loginPage.login('username', 'password');
    })

    test('Exchange', async ({ page }) => {
        await page.click('#pay_bills_tab');
        await page.click('text=Purchase Foreign Currency');
        await page.selectOption('#pc_currency', 'EUR');
        

        const rate = await page.locator('#sp_sell_rate');
        await expect(rate).toContainText('1 euro (EUR)');

        await page.type('#pc_amount', '500');
        await page.click('#pc_inDollars_true');
        await page.click('#pc_calculate_costs');

        const conversionAmount = await page.locator('#pc_conversion_amount');
        await expect(conversionAmount).toContainText('500.00 U.S. dollar (USD)');

        await page.click('#purchase_cash');

        const alertMessage = await page.locator('#alert_content');
        await expect(alertMessage).toContainText(
            'Foreign currency cash was successfully purchased.'
        );
    })
})