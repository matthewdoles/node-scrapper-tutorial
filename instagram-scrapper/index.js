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

  const {
    entry_data: {
      ProfilePage: {
        [0]: {
          graphql: {
            user: {
              edge_owner_to_timeline_media: { edges },
            },
          },
        },
      },
    },
  } = JSON.parse(scriptRegex[1]);

  const posts = [];
  for (let edge of edges) {
    const { node } = edge;
    posts.push({
      id: node.id,
      shortcode: node.shortcode,
      timestamp: node.taken_at_timestamp,
      likes: node.edge_liked_by.count,
      comments: node.edge_media_to_comment.count,
      videoViews: node.video_view_count,
      caption: node.edge_media_to_caption.edges[0].node.text,
      imageUrl: node.display_url,
    });
  }

  const instagramData = {
    followers: user.edge_followed_by.count,
    following: user.edge_follow.count,
    uploads: user.edge_owner_to_timeline_media.count,
    fullName: user.full_name,
    pictureURL: user.profile_pic_url_hd,
    posts,
  };
  console.log(instagramData);
  debugger;
})();
