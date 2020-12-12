const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {
  const USERNAME = 'dolesmatthew';
  const PASSWORD = '***invalid***';

  await twitter.initialize();
  await twitter.login(USERNAME, PASSWORD);
  await twitter.postTweet('Testing');
  await twitter.end();
})();
