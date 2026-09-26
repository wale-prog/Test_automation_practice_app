import {test as base } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import { MFAPage } from '../PageObjects/MFAPage';

export const test = base.extend<{loginPage: LoginPage, mfaPage: MFAPage}>({
    loginPage: async({page}, use) => {
        await use(new LoginPage(page));
    },
    mfaPage: async({page}, use) => {
        await use(new MFAPage(page));
    }
});
