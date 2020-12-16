const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  openDevTools: {
    mode: 'detach',
  },
});

(async () => {
  try {
    await nightmare.goto('https://news.ycombinator.com/news');

    const articles = await nightmare.evaluate(() => {
      const tableRows = document.querySelectorAll(
        'table[class="itemlist"] > tbody > tr'
      );
      const articles = [];
      for (let row of tableRows) {
        if (row.getAttribute('class') === 'spacer') continue;
        if (row.getAttribute('class') === 'athing') {
          const title = row.querySelector('td[class="title"] > a').innerText;
          const url = row
            .querySelector('td[class="title"] > a')
            .getAttribute('href');
          const source = row.querySelector('span[class="sitebit comhead"] > a')
            ? row.querySelector('span[class="sitebit comhead"] > a').innerText
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

          articles.push({ title, url, source, points, author, date, comments });
        }
      }
      return articles;
    });

    console.log(articles);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
