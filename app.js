const http = require('http');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case '/ping': {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('pong');
      break;
    }
    default: {
      res.statusCode = 404;
      res.end();
    }
  }
});

server.listen(port, hostname, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server running at http://${hostname}:${port}/`);
  }
});
