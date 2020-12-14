const puppeteer = require('puppeteer');

const BASE_URL = 'https://amazon.com';

let browser = null;
let page = null;

const amazon = {
  initialize: async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
  },
  getProductInfo: async (link) => {
    await page.goto(link, { waitUntil: 'networkidle2' });
    const details = await page.evaluate(() => {
      const title = document.querySelector('#productTitle').innerText;
      const manufacturer = document.querySelector('#bylibeInfo').innerText;
      const currentPrice = document.querySelector('#priceblock_dealprice')
        .innerText;
      const rating = document
        .querySelector('#acrPopover')
        .getAttribute('title');
      const totalRatings = document.querySelector('#acrCustomerReviewText')
        .innerText;

      return {
        title,
        manufacturer,
        currentPrice,
        rating,
        totalRatings,
      };
    });
    return details;
  },
  end: async () => {
    await browser.close();
  },
};

module.exports = amazon;
