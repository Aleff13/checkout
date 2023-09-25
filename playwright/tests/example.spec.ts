import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Checkout/);
});

test('has product', async ({ page }) => {
  await page.goto('/');
  const product = page.getByTestId("name-Wireless Earbuds")

  await expect(product).toHaveText("Wireless Earbuds")
});

test('select product', async ({ page }) => {
  await page.goto('/')
  const product = page.getByTestId("name-Gaming Mouse")
  const totalPrice = page.getByTestId("total-value")

  await product.click()
  await expect(totalPrice).toHaveText("Total: $32.00")
});

test('Desmarcar product', async ({ page }) => {
  await page.goto('/')
  const product = page.getByTestId("name-Wireless Earbuds")
  const totalPrice = page.getByTestId("total-value")

  await product.click()
  await expect(totalPrice).toHaveText("Total: $0.00")
});

test('fill cardnumber', async ({ page }) => {
  await page.goto('/')
  const number = page.locator("#outlined-cardNumber")
  
  await number.click()
  await number.fill("1234555")
  await expect(number).toHaveValue("1234555")
});