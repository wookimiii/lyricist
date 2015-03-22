var http = require('http');
var fs = require('fs');
var st = require('st');

var mount = st({ path: __dirname + '/public', url: '/', passthrough: true })
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {
    mount(req, res, function() {        res.end('this is not a static file');
    });
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
