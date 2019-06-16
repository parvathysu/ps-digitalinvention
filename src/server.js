const Server = require('../src/server/http');

Server.start().then((result) => {
  console.log(result);
});
