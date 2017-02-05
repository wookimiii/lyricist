var SockJS = require('sockjs-client');

module.exports = function (settings) {
    var sock = null;
    var reconnecting = null;

    function connect() {
        console.log("Connecting");
        sock = new SockJS('/state');
        sock.onopen = function () {
            if (reconnecting) {
                clearInterval(reconnecting);
                reconnecting = null;
            }
            settings.onConnect();
        }

        sock.onmessage = function(e) {
            console.log(e)
            var data = JSON.parse(e.data);
            settings.onMessage(data);
        };

        sock.onclose = function() {
            console.log("Connection closed!");
            if (!reconnecting) {
                // connect();
                reconnecting = window.setInterval(connect, 1000);
            }
        };
    }




    this.broadcast = function (data) {
        if (sock)
            sock.send(JSON.stringify(data));
    }

    connect();
    return this;    
}
