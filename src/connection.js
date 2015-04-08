var SockJS = require('sockjs-client');

module.exports = function (settings) {
    
    var sock = new SockJS('/state');

    sock.onopen = settings.onConnect;

    sock.onclose = function() {
        // console.log('close');
    };

    sock.onmessage = function(e) {
        var data = JSON.parse(e.data);
        settings.onMessage(data);
    };

    this.broadcast = function (data) {
        console.log('sending', data);
        sock.send(JSON.stringify(data));
    }

    return this;    
}
