const Nightmare = require('nightmare');
let nightmare = null;

const ycombinator = {
  initialize: async () => {
    nightmare = Nightmare({
      show: true,
      openDevTools: {
        mode: 'detach',
      },
    });
  },
  getArticles: async (limit = 30) => {
    try {
      await nightmare.goto('https://news.ycombinator.com/news');
      let articles = [];
      let isPagination;

      do {
        const newArticles = await nightmare.evaluate(() => {
          const tableRows = document.querySelectorAll(
            'table[class="itemlist"] > tbody > tr'
          );
          const articles = [];
          for (let row of tableRows) {
            if (row.getAttribute('class') === 'spacer') continue;
            if (row.getAttribute('class') === 'athing') {
              const title = row.querySelector('td[class="title"] > a')
                .innerText;
              const url = row
                .querySelector('td[class="title"] > a')
                .getAttribute('href');
              const source = row.querySelector(
                'span[class="sitebit comhead"] > a'
              )
                ? row.querySelector('span[class="sitebit comhead"] > a')
                    .innerText
                : false;

              const secondRow = row.nextSibling;
              const points = secondRow.querySelector('span[class="score"]')
                ? secondRow.querySelector('span[class="score"]').innerText
                : false;
              const author = secondRow.querySelector('a[class="hnuser"]')
                ? secondRow.querySelector('a[class="hnuser"]').innerText
                : false;
              const date = secondRow.querySelector('span[class="age"]')
                ? secondRow.querySelector('span[class="age"]').innerText
                : false;
              const comments = secondRow.querySelectorAll('a')[3]
                ? secondRow.querySelectorAll('a')[3].innerText
                : false;

              articles.push({
                title,
                url,
                source,
                points,
                author,
                date,
                comments,
              });
            }
          }

          return articles;
        });

        articles = [...articles, ...newArticles];

        isPagination = await nightmare.exists('a[class="morelink"]');
        if (isPagination && articles.length < limit) {
          await nightmare.click('a[class="morelink"]');
          await nightmare.wait('table[class="itemlist"]');
        }
      } while (articles.length < limit && isPagination);

      return articles.splice(0, limit);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  },
};

module.exports = ycombinator;
