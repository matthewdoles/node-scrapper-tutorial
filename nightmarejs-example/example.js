const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true,
  openDevTools: {
    mode: 'detach',
  },
});

(async () => {
  try {
    await nightmare.viewport(1200, 600);
    await nightmare.goto('https://duckduckgo.com');
    await nightmare.type('#search_form_input_homepage', 'github nightmare');
    await nightmare.click('#search_button_homepage');
    await nightmare.wait('#r1-0 a.result__a');
    let link = await nightmare.evaluate(
      () => document.querySelector('#r1-0 a.result__a').href
    );
    const height = await nightmare.evaluate(() => document.body.scrollHeight);
    await nightmare.scrollTo(height, 0);
    await nightmare.end();
    console.log(link);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
