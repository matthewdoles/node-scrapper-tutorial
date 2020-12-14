const puppeteer = require('puppeteer');
const amazon = require('./amazon');

(async () => {
  await amazon.initialize();
  const mac = await amazon.getProductInfo(
    'https://www.amazon.com/Apple-2-7GHz-ME086LL-Desktop-Refurbished/dp/B00M4LWXI0'
  );
  const backpack = await amazon.getProductInfo(
    'https://www.amazon.com/Thule-Crossover-32L-Backpack-Black/dp/B004XANKVO'
  );
  console.log(mac, backpack);
  await amazon.end();
})();
