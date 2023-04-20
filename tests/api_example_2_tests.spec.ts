import { test, expect} from "@playwright/test";

test.describe.only("Example API test", () => {
    const baseUrl = "https://reqres.in/api"

    test("Simple API Test - Assert Response Single User", async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`);
        expect(response.status()).toBe(200);

        const responseBody = JSON.parse(await response.text());
    })

    test("GET request - get user detail", async ({ request}) => {
        const response = await request.get(`${baseUrl}/users/11`);
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.data.id).toBe(11);
        expect(responseBody.data.email).toBe("george.edwards@reqres.in");
        expect(responseBody.data.last_name).toBe("Edwards");
        expect(responseBody.data.avatar).toBeTruthy();
    })

    test("POST request - create new user", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 100,
                first_name: "Psarka",
                last_name: "Berlinka",
                email: "psarka.berlinka@example.com"
            }
        })
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(201);
        expect(responseBody.id).toBe(100);
        expect(responseBody.first_name).toBe("Psarka");
        expect(responseBody.last_name).toBe("Berlinka");
        expect(responseBody.email).toBe("psarka.berlinka@example.com");
    })

    test("PUT request update user details", async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/7`, {
            data: {
                first_name: "Kula",
                job: "professional gamer",
                hobby: "sleeping champion"
            }
        })
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(200);
        expect(responseBody.first_name).toBe("Kula");
        expect(responseBody.job).toBe("professional gamer");
        expect(responseBody.hobby).toBe("sleeping champion");
        expect(responseBody.updatedAt).toBeTruthy;
    })
})