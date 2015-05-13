var http = require('http');
var st = require('st');
var fs = require('fs');
var sockjs = require('sockjs');
var Router = require('router');

var router = Router();
function index(req, res) {
    res.setHeader("Content-Type", "text/html");
    var html = fs.readFileSync("./public/index.html").toString();
    html = html.replace("#{ID}", req.params.id || 0);
    res.end(html);
    return;
}

router.get("/", index);
router.get("/pres/:id", index);

var mount = st({ path: __dirname + '/public', url: '/', passthrough: true })
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (req, res) {

    router(req, res, function () {
        mount(req, res, function() {
            res.end('this is not a static file');
        });
    });

});

var SOCKJS_URL = 'http://cdn.jsdelivr.net/sockjs/0.3.4/sockjs.min.js';
var CONNECTIONS = {};
var socketServer = sockjs.createServer({ sockjs_url: SOCKJS_URL});

socketServer.on('connection', function(conn) {
    CONNECTIONS[conn.id] = conn;
    conn.on('data', function(message) {
        var msg = JSON.parse(message);
        // if identification message
        if (msg.sys === "id") {
            conn.presentation_id = msg.id;
        } else {
            broadcast(message, conn);
        }
    });
    conn.on('close', function() {});
});

function broadcast(msg, emitter) {
    // console.log(msg);
    for (var id in CONNECTIONS) {
        var recipient = CONNECTIONS[id];
        if (id !== emitter.id && samePresentation(recipient, emitter)) {
            recipient.write(msg);
        }
    }
}

function samePresentation(a, b) {
    return a.presentation_id === b.presentation_id
}

socketServer.installHandlers(server, {prefix:'/state'});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen((process.env.PORT || 8000));

// Put a friendly message on the terminal
    console.log("Server running at http://127.0.0.1:8000/");
