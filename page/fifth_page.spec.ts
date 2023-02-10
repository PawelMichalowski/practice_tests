import { test } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { HomePage } from './HomePage';
import { PaymentPage } from '../page/PaymentPage';
import { Navbar } from '../page/Navbar';


test.describe('New Payment', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let paymentPage: PaymentPage;
    let navbar: Navbar;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        paymentPage = new PaymentPage(page);
        navbar = new Navbar(page);

        homePage.goto();
        homePage.clickOnSignIn();
        loginPage.login('username', 'password');
    })

    test('Should send new payment', async ({ page }) => {
        navbar.clickOnTab('Pay Bills');
        await paymentPage.createPayment();
        await paymentPage.assertSuccessMessage();
    })
 })
