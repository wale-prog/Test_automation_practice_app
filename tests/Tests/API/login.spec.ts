import { test, expect } from '@playwright/test';

test.describe('Login API tests', () => {

    test('Validate that user cannot login with empty credentials', async({request}) => {
        const startTime = Date.now();
        const response = await request.post('/api/v1/auth/login', {
            data: {
                email: "",
                password: ""
            }
        });

        const responseTime = Date.now() - startTime;
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody.error.message).toBe('email: Invalid email');

        expect(responseTime).toBeLessThan(2000);
    })
})