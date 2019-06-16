const urlMetadata = require('url-metadata');
const request = require('request');
const cheerio = require('cheerio');

module.exports = {
  getExistingScrapeData(req) {
    return new Promise((resolve, reject) => {
      const reqUrl = req.body.url;

      if (reqUrl) {
        urlMetadata(req.body.url).then(
          (metadata) => {
            resolve(metadata);
          },
          (error) => {
            reject(error);
          });
      } else {
        reject({
          status: 'error',
          message: 'Input url is missing'
        });
      }
    });
  },

  getNewWebScrapeData(req) {

    return new Promise((resolve, reject) => {
      const reqUrl = req.body.url;

      if (reqUrl) {
        request(reqUrl, (error, response, html) => {

          if (error) {
            reject({
              status: 'error',
              message: 'Error parsing input url, or no data was scraped.'
            });
          } else {
            const metadata = {},
              // set a reference to the document that came back
              $ = cheerio.load(html),
              $title = $('head title').text(),
              $desc = $('meta[name="description"]').attr('content'),
              $kwd = $('meta[name="keywords"]').attr('content'),
              $ogTitle = $('meta[property="og:title"]').attr('content'),
              $ogImage = $('meta[property="og:image"]').attr('content'),
              $ogkeywords = $('meta[property="og:keywords"]').attr('content'),
              $images = $('img');

            if ($title) {
              metadata.title = $title;
            }

            if ($desc) {
              metadata.description = $desc;
            }

            if ($kwd) {
              metadata.keywords = $kwd;
            }

            if ($ogImage && $ogImage.length) {
              metadata.ogImage = $ogImage;
            }

            if ($ogTitle && $ogTitle.length) {
              metadata.ogTitle = $ogTitle;
            }

            if ($ogkeywords && $ogkeywords.length) {
              metadata.ogkeywords = $ogkeywords;
            }

            if ($images && $images.length) {
              metadata.images = [];

              for (let i = 0; i < $images.length; i++) {
                metadata.images.push($($images[i]).attr('src'));
              }
            }
            resolve(metadata);
          }
        });
      } else {
        reject({
          status: 'error',
          message: 'Input url is missing'
        });
      }
    });
  }
};
