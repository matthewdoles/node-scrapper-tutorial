const puppeteer = require('puppeteer');

(async () => {
  const BASE_URL = 'https://twitter.com';
  const LOGIN_URL = 'https://twitter.com/login';
  const USERNAME = 'dolesmatthew';
  const PASSWORD = '***invalid***';

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(LOGIN_URL);
  await page.waitForSelector('input[name="session[username_or_email]"]');
  await page.type('input[name="session[username_or_email]"]', USERNAME);
  await page.type('input[name="session[password]"]', PASSWORD);
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await browser.close();
})();
