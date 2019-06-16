
const meta = require('../services/meta');

module.exports = {
  getExistingScrapeData(req) {
    return new Promise((resolve, reject) => {
      meta.getExistingScrapeData(req).then(resolve).catch(reject);
    });
  },

  getNewWebScrapeData(req) {
    return new Promise((resolve, reject) => {
      meta.getNewWebScrapeData(req).then(resolve).catch(reject);
    });
  }
};
