import { test, expect} from "@playwright/test";
import { HomePage } from './HomePage';

test.describe('Search Results', () => {
    let homePage: HomePage;

    test('Should find search results', async ({ page }) => {
        homePage = new HomePage(page);
        
        await homePage.goto();
        await homePage.searchFor('bank');
       
        const numberOfLinks = await page.locator('li > a')
        await expect(numberOfLinks).toHaveCount(2);
    })
})