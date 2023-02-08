import { test, expect } from '@playwright/test';

test.describe.only('Filter Transactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
        await page.click('#signin_button');
        await page.type('#user_login', 'username');
        await page.type('#user_password', 'password');
        await page.click('text=Sign in');
    })

    test('Filter', async ({ page }) => {
        await page.click('#account_activity_tab');
        await page.selectOption('#aa_accountId', '2');

        const checkingAccount = await page.locator(
            '#all_transactions_for_account tbody tr'
        )
        await expect(checkingAccount).toHaveCount(3);
    })
})