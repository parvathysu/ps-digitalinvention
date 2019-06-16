const Express = require('express');
const ApiRoute = require('../routes/routes.js');
const AppConfig = require('../config/appConfig.js');
const BodyParser = require('body-parser');

exports.start = () => new Promise((resolve, reject) => {
  const Server = Express();

  Server.set('views', `${__dirname}/../views/`);
  Server.set('view engine', 'ejs');
  Server.use('/images', Express.static(`${__dirname}/../assets/images`));
  Server.use(BodyParser.urlencoded({ extended: true }));
  Server.use(BodyParser.json());
  Server.use(ApiRoute);

  Server.listen(AppConfig.config.PORT, (error) => {
    const result = {};

    if (error) {
      result.message = 'Error starting server';
      result.status = 'error';
      resolve(result);
    } else {
      result.message = `Server listening on port ${AppConfig.config.PORT}`;
      result.status = 'success';
      resolve(result);
    }
  });
});

