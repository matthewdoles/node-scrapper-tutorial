const puppeteer = require('puppeteer');

const truncate = (str, length, truncateStr) => {
  truncateStr = truncateStr || '...';
  length = ~~length;
  return str.length > length ? str.slice(0, length) + truncateStr : str;
};

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto('https://learnscraping.com/', { waitUntil: 'networkidle0' });

  await page.exposeFunction('truncate', (str, length, truncateStr) =>
    truncate(str, length, truncateStr)
  );

  const details = await page.evaluate(async () => {
    const getInnerText = (selector) => {
      return document.querySelector(selector)
        ? document.querySelector(selector).innerText
        : null;
    };
    return {
      title: await truncate(getInnerText('h1[class="site-title"]'), 5),
      description: await getInnerText('p[class="site-description"]'),
      invalid: await getInnerText('test[class="test"]'),
    };
  });
  console.log(details);

  //await browser.close();
})();
