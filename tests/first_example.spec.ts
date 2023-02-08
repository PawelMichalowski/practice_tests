import { test, expect } from '@playwright/test';

test.describe('Login / Logout', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
    })

    test('Logo Zero Bank', async ({ page }) => {
    const Logo = await page.locator('.brand')
    await expect(Logo).toContainText('Zero Bank')
    })

    test('Negative scenario for login', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/')
    await page.click('#signin_button')
    await page.type('#user_login', 'password')
    await page.type('#user_password', 'username')
    await page.click('text=Sign in');

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })

    test('Positive scenario for login and logout', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/')
        await page.click('#signin_button')
        await page.type('#user_login', 'username')
        await page.type('#user_password', 'password')
        await page.click('text=Sign in')

        const accountSummaryTab = await page.locator('#account_summary_tab')
        await expect(accountSummaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})