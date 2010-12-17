var meryl = require('meryl');

var opts = {
  debug: true,
  templateDir: 'templates',
  templateExt: '.jshtml'
};

meryl.h('GET /', function (req, resp) {
  resp.send('<h3>Hello, World !</h3>');
});
meryl.h('GET /welcome/{yourname}?', function (req, resp) {
  resp.send('Hello, ' + req.params.yourname || 'World');
});
meryl.h('GET /greet/{name}', function (req, resp) {
  resp.send('<h3>Hello, ' + req.params.name + '</h3>');
});
meryl.h('GET /template/{param}', function (req, resp) {
  resp.render('template', {'param': req.params.param});
});
meryl.h('GET /canvas', function (req, resp) {
  resp.render('canvas');
});
meryl.h('GET /canvas2', function (req, resp) {
  resp.render('canvas2');
});

meryl.p(function (req, resp, next) {
  console.log(req.params.pathname); next();
});
meryl.p('GET /private/*', function (req, resp, next) {
  resp.status = 401; throw 'Forbidden';
});

require('http').createServer(meryl.cgi(opts)).listen(8090, "localhost");
require('sys').debug('Serving http://localhost:8090/');
