import { Page, Locator } from '@playwright/test'
import { PageBase } from './PageBase';

export class LoginPage extends PageBase {

    // Locators
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitBtn: Locator;
    readonly pageHeading: Locator;
    readonly emptyEmailErrorMsg: Locator;
    readonly emptyPasswordErrorMsg: Locator

    constructor(page: Page) {
        super(page)
        this.emailField = page.getByTestId('login-username-input');
        this.passwordField = page.getByTestId('login-password-input');
        this.submitBtn = page.getByTestId('login-submit-button');
        this.pageHeading = page.getByText('Cendi', { exact: true });
        this.emptyEmailErrorMsg = page.getByText('Enter your email.');
        this.emptyPasswordErrorMsg = page.getByText('Enter your password.');
    }

    async getEmailField(): Promise<Locator> {
        this.clearField(this.emailField)
        return this.emailField;
    };

    async getPasswordField(): Promise<Locator> {
        return this.passwordField;
    }

    async getSubmitBtn(): Promise<Locator> {
        return this.submitBtn;
    }

    async fillCredentials(email: string, password:string): Promise<void> {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    async clickSubmitBtn(): Promise<void> {
        await this.submitBtn.click();
    }
}
