const request = require('request-promise');
const cheerio = require('cheerio');

const USERNAME = 'willsmith';
const BSAE_URL = `https://instagram.com/${USERNAME}`;

(async () => {
  const response = await request(BSAE_URL);
  const $ = cheerio.load(response);

  const script = $('script[type="text/javascript"]').eq(3).html();
  const scriptRegex = /window._sharedData = (.+);/g.exec(script);
  const {
    entry_data: {
      ProfilePage: {
        [0]: {
          graphql: { user },
        },
      },
    },
  } = JSON.parse(scriptRegex[1]);

  const instagramData = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    fullName: user.full_name,
    pictureURL: user.profile_pic_url_hd,
  };
  console.log(instagramData);
})();
