import { Locator, Page } from "@playwright/test";

export class PageBase {
readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }
    async clearField(element: Locator) {
        element.clear();
    }
}