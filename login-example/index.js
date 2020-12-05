const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  let initialRequest = await request({
    uri: 'http://quotes.toscrape.com/login',
    method: 'GET',
    gzip: true,
    resolveWithFullResponse: true,
  });

  let cookie = initialRequest.headers['set-cookie']
    .map((value) => value.split(';')[0])
    .join(' ');

  let $ = cheerio.load(initialRequest.body);
  let csrfToken = $('input[name="csrf_token"]').val();

  try {
    let loginRequest = await request({
      uri: 'http://quotes.toscrape.com/login',
      method: 'POST',
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookie,
        Host: 'quotes.toscrape.com',
        Origin: 'http://quotes.toscrape.com',
        Referer: 'http://quotes.toscrape.com/login',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
      },
      formData: {
        csrf_token: csrfToken,
        username: 'admin',
        password: 'admin',
      },
      resolveWithFullResponse: true,
      gzip: true,
    });
  } catch (res) {
    cookie = res.response.headers['set-cookie']
      .map((value) => value.split(';')[0])
      .join(' ');
  }
})();
