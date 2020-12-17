const ycombinator = require('./ycombinator');
(async () => {
  await ycombinator.initialize();
  const articles = await ycombinator.getArticles(55);
  console.log(articles);
})();
