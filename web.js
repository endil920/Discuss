var fs = require('fs');
var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  var msgBuf = fs.readFileSync('index.html');
  var msg = msgBuf.toString('utf8');
  response.send(msg);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
