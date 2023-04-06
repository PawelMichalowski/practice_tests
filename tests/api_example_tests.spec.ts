import { test, expect } from '@playwright/test';

test.describe.parallel('Example API Tests', () => {
    const baseUrl = 'https://reqres.in/api'

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/5`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
    })
    
    test('Simple API Test - Assert non existing Endpoint ', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`);
        expect(response.status()).toBe(404);
    })

    test('GET Request - Get user details', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/7`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(7);
        expect(responseBody.data.first_name).toBe('Michael');
        expect(responseBody.data.last_name).toBe('Lawson');
        expect(responseBody.data.avatar).toBeTruthy();
    })

    test('POST Request - Create new user', async ({ request }) => {
        const response = await request.post(`${baseUrl}/user`, {
            data: {
                id: 100,
                first_name: 'Kula',
                last_name: 'Kulson' 
            }
        })
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.id).toBe(100);
        expect(responseBody.first_name).toBe('Kula');
        expect(responseBody.last_name).toBe('Kulson');
    })

    test('POST Request - Login successful', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            }
        })  
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.token).toBeTruthy();
    })

    test('POST Request - Login unsuccessful', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                email: 'eve.holt@reqres.in',
            }
        })  
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(400);
        expect(responseBody.error).toBe('Missing password');
    })
    
    test('PUT Request Update user details', async ({ request }) => {
        const response = await request.put(`${baseUrl}/user/2`, {
            data: {
                name: 'Kula',
                job: 'professional gamer',
                hobby: 'eater',
            }
        })
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe('Kula');
        expect(responseBody.job).toBe('professional gamer');
        expect(responseBody.hobby).toBe('eater');
        expect(responseBody.updatedAt).toBeTruthy();
    })

    test('DELETE Request - delete user', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`);
        expect(response.status()).toBe(204);
    })
})
