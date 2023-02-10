import { test, expect } from '@playwright/test';

test.describe('Example API Tests', () => {
    const baseUrl = 'https://reqres.in/api'

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/6`);
        expect(response.status()).toBe(200);
    })
})