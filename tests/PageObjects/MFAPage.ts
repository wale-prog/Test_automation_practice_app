import { Page, Locator } from "@playwright/test";
import { PageBase } from "./PageBase";

export class MFAPage extends PageBase {
   
    readonly mfaInput: Locator;
    readonly verifyButton: Locator;
    readonly mfaPageHeading: Locator;
    readonly backToLoginLink: Locator;

    constructor(page: Page) {
        super(page)
        this.mfaInput = page.getByTestId('login-mfa-code-input');
        this.verifyButton = page.getByTestId('login-mfa-submit-button');
        this.mfaPageHeading = page.getByRole('heading', { name: 'Enter your code' });
        this.backToLoginLink = page.getByRole('button', { name: 'Back to log in' });
    }

    async isMfaPageHeadingVisible(): Promise<boolean> {
        return this.mfaPageHeading.isVisible({timeout: 2000});
    }

    async fillMfaCode(code: string) {
        this.clearField(this.mfaInput)
        await this.mfaInput.fill(code);
        await this.verifyButton.click();
    }

}