import * as vscode from 'vscode';
import { chromium } from 'playwright';
import { API_BASE_URL } from './constants';

export const GoogleAuthenticate = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Navigate to the login URL
  await page.goto(`${API_BASE_URL}/login/google`);

  // Wait for the user to complete the login process
  console.log(
    'Please complete the login process in the opened browser window.',
  );
  await new Promise((resolve) => setTimeout(resolve, 120000)); // Wait for 2 minutes

  // Get the cookie
  const cookies = await context.cookies();
  console.log('Cookies:', cookies);

  // Close the browser
  await browser.close();
};
