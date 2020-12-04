const request = require('request-promise');
const cheerio = require('cheerio');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

const URLS = [
  'https://www.imdb.com/title/tt0102926/',
  'https://www.imdb.com/title/tt2267998/',
];

(async () => {
  const movieData = [];
  for (const url of URLS) {
    const response = await request({
      uri: url,
      headers: {
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'max-age=0',
        Connection: 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        Host: 'www.imdb.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36',
      },
      gzip: true,
    });

    let $ = cheerio.load(response);
    let title = $('div[class="title_wrapper"] > h1').text().trim();
    let rating = $('span[itemprop="ratingValue"]').text().trim();
    let ratingCount = $('div[class="imdbRating"] > a').text().trim();
    let poster = $('div[class="poster"] > a > img').attr('src');
    let releaseDate = $('a[title="See more release dates"]').text().trim();
    let genres = [];
    $('div[class="title_wrapper"] a[href^="/search/"]').each((i, el) => {
      genres.push($(el).text());
    });

    movieData.push({
      title,
      rating,
      ratingCount,
      poster,
      releaseDate,
      genres,
    });
  }

  fs.writeFileSync(
    './simple-imdb-scrapper/data.json',
    JSON.stringify(movieData),
    'utf-8'
  );

  const fields = ['title', 'rating'];
  const json2csvParser = new Json2csvParser({ fields });
  const csv = json2csvParser.parse(movieData);
  fs.writeFileSync('./simple-imdb-scrapper/data.csv', csv, 'utf-8');

  console.log(csv);
})();
