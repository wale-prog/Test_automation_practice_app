import { Page, Locator } from '@playwright/test';

export const getResponseBody = async(path: string, page: Page, element: Locator): Promise<any> => {
const [response] = await Promise.all([
    page.waitForResponse(response => response.url().includes(path) && response.status() === 200),
    element.click()
]);
return await response.json();
}