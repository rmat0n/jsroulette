var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');
var sys = require(process.binding('natives').util ? 'util' : 'sys');
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

meryl.p(function (req, resp, next) {
  console.log(req.params.pathname); next();
});
meryl.p('GET /private/*', function (req, resp, next) {
  resp.status = 401; throw 'Forbidden';
});

http.createServer(meryl.cgi(opts)).listen(8090, "localhost");
sys.debug('Serving http://localhost:8090/');
