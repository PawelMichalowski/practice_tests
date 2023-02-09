import { expect, Locator, Page } from '@playwright/test';

export class PaymentPage {
    readonly page: Page;
    readonly payeeSelectBox: Locator;
    readonly payeeDetailButton: Locator;
    readonly payeeDetail: Locator;
    readonly accountSelectBox: Locator;
    readonly amountInput: Locator;
    readonly dateInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitPayButton: Locator;
    readonly message: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.payeeSelectBox = page.locator('#sp_payee');
        this.payeeDetailButton = page.locator('#sp_get_payee_details');
        this.payeeDetail = page.locator('#sp_payee_details');
        this.accountSelectBox = page.locator('#sp_account');
        this.amountInput = page.locator('#sp_amount');
        this.dateInput = page.locator('#sp_date');
        this.descriptionInput = page.locator('#sp_description');
        this.submitPayButton = page.locator('#pay_saved_payees');
        this.message = page.locator('#alert_content');
    }

    async createPayment() {
        await this.payeeSelectBox.selectOption('apple');
        await this.payeeDetailButton.click();
        await expect(this.payeeDetail).toBeVisible();
        await this.accountSelectBox.selectOption('6');
        await this.amountInput.type('10000');
        await this.dateInput.type('2023-02-08');
        await this.descriptionInput.type('new description');
        await this.submitPayButton.click();
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible();
        await expect(this.message).toContainText(
            'The payment was successfully submitted.'
        );
    }
}