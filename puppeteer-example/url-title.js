const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com/');

  const title = await page.title();
  console.log(`Title of this page is ${title}`);
  const url = await page.url();
  console.log(`Title of this page is ${url}`);

  await browser.close();
})();
