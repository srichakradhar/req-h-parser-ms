var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send("...Chuck's IP address, language and operating system Server...");
});

app.get('/api/whoami', function (req, res) {
  var ip;
  
  if (req.headers['x-forwarded-for']) {
      ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
      ip = req.connection.remoteAddress;
  } else {
      ip = req.ip;
  }
  var uaString = req.headers['user-agent'];
  console.log('request headers', req.headers);
  var os = uaString.substring(uaString.indexOf('(') + 1, uaString.indexOf(')'));
  res.send({ipaddress: ip, language: req.headers['accept-language'].substring(0, 5), software: os});
});

app.listen(process.env.PORT || 8080, function () {
  console.log('IP address, language and operating system server listening on port 8080!');
});