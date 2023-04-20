import { test, expect } from '@playwright/test';

test.describe('Example API Tests 2', () => {
    const baseUrl = 'https://angular.realworld.io/'

    test('First API Test - Verification of Tags', async ({ request }) => {
        // const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
        const response = await request.get(`${baseUrl}/api/tags`);

        // expect(issues.ok()).toBeTruthy();
        expect(response.ok()).toBeTruthy;

        // expect(await issues.json()).toContainEqual(expect.objectContaining({
        //   title: '[Feature] request 1',
        //   body: 'Feature description'

        expect(response.json()).toContainEqual(expect.objectContaining({
            body: "tags",
            tags: "welcome"
        }));


        // const responseBody = JSON.parse(await response.text());

        
        // expect(response.body.toString).toContain("welcome");
        // // expect(responseBody.data.first_name).toBe('Michael');
        // // expect(responseBody.data.last_name).toBe('Lawson');
        // // expect(responseBody.data.avatar).toBeTruthy();
    })
})