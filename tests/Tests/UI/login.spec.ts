import { expect, type Page } from '@playwright/test';
import {test} from '../../fixtures/loginFixtures'
import { LoginPage } from '../../PageObjects/LoginPage';
import { MFAPage } from '../../PageObjects/MFAPage';
import { getResponseBody } from '../../../Utils/helperMethods';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Login tests', {tag: "@pilot"}, () => {
    let page: Page, loginPage: LoginPage, mfaPage: MFAPage;
    const email = process.env.DEV_EMAIL || "";
    const password = process.env.DEV_PASSWORD || "";

    test.beforeAll(async({browser}) => {
        page = await browser.newPage();
        await page.goto('/login');
        loginPage = new LoginPage(page);
        mfaPage = new MFAPage(page);
        // await page.waitForTimeout(20000)
    });

    test('Validate that user cannot login with empty credentials', {tag: "@sanity"}, async() => {
        await loginPage.fillCredentials("", "");
        await loginPage.clickSubmitBtn();
        expect(loginPage.emptyEmailErrorMsg).toBeVisible();
        expect(loginPage.emptyPasswordErrorMsg).toBeVisible();
        const emailError = await loginPage.emptyEmailErrorMsg.textContent();
        expect(emailError).toBe('Enter your email.')
    });

    test('Validate that user is unable to login with wrong email', {tag: "@sanity"}, async() => {
        await loginPage.fillCredentials("ioiajidsnind@yahoo.com", "Password@1234");
        await loginPage.clickSubmitBtn();
    });

    test('Validate that user can login with the correct credentials', async() => {
        await loginPage.fillCredentials(email, password);
        const response = await getResponseBody('/auth/login', page, await loginPage.getSubmitBtn());
        console.log("Response body: ", await response);
        if(await mfaPage.isMfaPageHeadingVisible()) {
            await mfaPage.mfaInput.fill('1234556');
            await mfaPage.verifyButton.click();
        }
        await page.waitForTimeout(10000);
    });
})
