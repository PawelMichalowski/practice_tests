import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';

test.describe('Filter Transactions', () => {
    let loginPage: LoginPage
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);

        await homePage.goto();
        await homePage.clickOnSignIn();
        await loginPage.login('username', 'password');
    })

    test('Filter', async ({ page }) => {
        await page.click('#account_activity_tab');
        await page.selectOption('#aa_accountId', '2');
        const checkingAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(checkingAccount).toHaveCount(3);

        await page.selectOption('#aa_accountId', '4');
        const loanAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(loanAccount).toHaveCount(2);

        await page.selectOption('#aa_accountId', '6');
        const noResults = await page.locator('.well');
        await expect(noResults).toBeVisible();
    })
})