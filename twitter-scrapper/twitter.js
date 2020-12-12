const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com';
const LOGIN_URL = 'https://twitter.com/login';

let browser = null;
let page = null;

const twitter = {
  initialize: async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto(BASE_URL);
  },
  login: async (username, password) => {
    await page.goto(LOGIN_URL);
    await page.waitForSelector('input[name="session[username_or_email]"]');
    await page.type('input[name="session[username_or_email]"]', username);
    await page.type('input[name="session[password]"]', password);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();
  },
  postTweet: async (message) => {
    const currentURL = await page.url();
    const inputSelector = 'div[class="notranslate public-DraftEditor-content"]';
    if (currentURL !== BASE_URL) {
      await page.goto(BASE_URL);
    }
    await page.waitForSelector(inputSelector);
    await page.click(inputSelector);
    await page.waitFor(500);
    await page.keyboard.type(message, { delay: 50 });
    await page.click('div[data-testid="tweetButtonInline"]');
  },
  end: async () => {
    await browser.close();
  },
};

module.exports = twitter;
