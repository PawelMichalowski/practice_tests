import { test, expect } from '@playwright/test';

test.describe('Transfer Funds', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')
    })

    test('Payment', async ({ page }) => {
        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.type('#tf_amount', '500')
        await page.type('#tf_description', 'new description')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('h2.btn_submit')
        await expect(boardHeader).toContainText('Verify')
        await page.click('#btn_submit')

        const message = await page.locator('#alert-success')
        await expect(message).toContainText(
            'You successfully submitted your transaction.'
        )
    })
})