const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone X'];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://learnscraping.com/');

  await browser.close();
})();
