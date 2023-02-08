import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

test.describe('Trsansfer Funds', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
        await homePage.clickOnSignIn();
        await loginPage.login('username', 'password');
    })

    test('Transfer', async ({ page }) => {
        await page.click('#transfer_funds_tab');
        await page.selectOption('#tf_fromAccountId', '2');
        await page.selectOption('#tf_toAccountId', '3');
        await page.type('#tf_amount', '500');
        await page.type('#tf_description', 'new description');
        await page.click('#btn_submit');

        const boardHeader = await page.locator('h2.board-header');
        await expect(boardHeader).toContainText('Verify');
        await page.click('#btn_submit');

        const message = await page.locator('.alert-success');
        await expect(message).toContainText(
            'You successfully submitted your transaction.'
        );
    })
})