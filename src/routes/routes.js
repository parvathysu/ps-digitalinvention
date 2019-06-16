const Express = require('Express');
const App = Express.Router();
const HomeController = require('../controller/HomeController');

App.route('/').get((req, res) => {
  res.render('index');
});

App.route('/getExistingScrapeData').post((req, res) => {
  HomeController.getExistingScrapeData(req).then((responseData) => {
    res.send(responseData);
  }).catch((error) => {
    res.send(error);
  });
});

App.route('/getNewWebScrapeData').post((req, res) => {
  HomeController.getNewWebScrapeData(req).then((responseData) => {
    res.send(responseData);
  }).catch((error) => {
    res.send(error);
  });
});

module.exports = App;
