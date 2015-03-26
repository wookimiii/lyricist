/** @jsx React.DOM */

// var React = require('react');
React.initializeTouchEvents(true)

var Presentation = require('./presentation.js');
var MenuBar = require('./MenuBar.js');
var Form = require('./Form.js');
var app = null;

var SockJS = require('sockjs-client');
var sock = new SockJS('/state');

sock.onopen = function() {
    console.log('open');
    sock.send(JSON.stringify({sys: "sync"}));
    app = React.render(<App />, document.body);
};

sock.onclose = function() {
    console.log('close');
};

var App = React.createClass({
    getInitialState: function () {
        return {
            page: "presentation",
            text: "Blah;; Blah;; Welcome to;; the Slide Show;;This is the end",
            currentSlide: 0
        };
    },
    render: function() {
        var page = this.state.page;
        return (
            <div>
                <MenuBar gotoPage={this.gotoPage}/>
                {this.show(page)}
            </div>
        );
    },

    show: function (page) {
       var pages = {
           "presentation": this.presentation(),
           "form": this.form()
       }
       return pages[page];
    },

    form: function () {
        return (
            <Form text={this.state.text} update={this.updateText}/>
        );
    },

    presentation: function () {
        var props = {
            text: this.state.text,
            current: this.state.currentSlide,
            clickSlide: this.gotoSlide
        };

        return (
            <Presentation {...props} />
        );
    },

    updateText: function(text) {
        this.setState({text: text});
        updateOthers({text: text});
    },

    gotoSlide: function(i) {
        this.setState({currentSlide: i});
        updateOthers({currentSlide: i});
    },

    gotoPage: function(page) {
        this.setState({page: page});
    },

    componentDidUpdate: function (prevProps, prevState) {
        console.log("Update to server:", this.state);
    }
});

function updateOthers(state) {
    console.log('update others', state);
    sock.send(JSON.stringify(state));
}

sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    console.log("recevied update", data);
    if (data.sys == "sync") {
        sock.send(JSON.stringify({
            text: app.state.text, 
            currentSlide: app.state.currentSlide
        }));
    }
    if (data.text && data.text !== app.state.text) {
        app.setState(data);
    }

    if (typeof data.currentSlide != 'undefined' && data.currentSlide !== app.state.currentSlide) {
        app.setState(data);
    }

};
