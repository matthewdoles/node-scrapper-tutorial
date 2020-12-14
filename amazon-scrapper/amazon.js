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
  end: async () => {
    await browser.close();
  },
};

module.exports = amazon;
