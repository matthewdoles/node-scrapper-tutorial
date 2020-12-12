const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://instagram.com');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', 'matteddied');
  await page.type('input[name="password"]', '***invalid***');
  await page.keyboard.press('Enter');
  await page.waitForNavigation();

  await browser.close();
})();
