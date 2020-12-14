const puppeteer = require('puppeteer');
const amazon = require('./amazon');

(async () => {
  await amazon.initialize();
  await amazon.end();
})();
