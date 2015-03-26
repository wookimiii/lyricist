var http = require('http');
var st = require('st');
var fs = require('fs');
var sockjs = require('sockjs');

var mount = st({ path: __dirname + '/public', url: '/', passthrough: true })
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {
    if (req.url === "/" || req.url== "/?/") {
        res.setHeader("Content-Type", "text/html");
        var html = fs.readFileSync("./public/index.html");
        res.end(html);
        return;
    }

    mount(req, res, function() {
        res.end('this is not a static file');
    });
});

var SOCKJS_URL = 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js';
var CONNECTIONS = {};
var socketServer = sockjs.createServer({ sockjs_url: SOCKJS_URL});

socketServer.on('connection', function(conn) {
    console.log(CONNECTIONS);
    CONNECTIONS[conn.id] = conn;
    conn.on('data', function(message) {
        console.log(message);
        broadcast(message, conn.id);
    });
    conn.on('close', function() {});
});

function broadcast(msg, emitter) {
    for (var id in CONNECTIONS) {
        console.log(id);
        if (id !== emitter) {
            console.log("writing to", id);
            CONNECTIONS[id].write(msg);
        }
    }
}

socketServer.installHandlers(server, {prefix:'/state'});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
