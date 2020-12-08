const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input[title="Search"]', 'Udemy Tutorials', { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({ path: './puppeteer-example/udemy.png' });

  await browser.close();
})();
