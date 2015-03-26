/** @jsx React.DOM */

// var React = require('react');
window.React = React;

var Presentation = require('./presentation.js');
var MenuBar = require('./MenuBar.js');
var Form = require('./Form.js');

var SockJS = require('sockjs-client');
var sock = new SockJS('/state');

sock.onopen = function() {
    console.log('open');
};

sock.onclose = function() {
    console.log('close');
};

var App = React.createClass({
    getInitialState: function () {
        return {
            page: "form",
            text: "Welcome to the Slide Show;;This is the end",
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
    sock.send(JSON.stringify(state));
}

var app = React.render(<App />, document.body);
sock.onmessage = function(e) {
    var data = JSON.parse(e.data);
    if (data.text && data.text !== app.state.text) {
        app.setState(data);
    }

    if (typeof data.currentSlide != 'undefined' && data.currentSlide !== app.state.currentSlide) {
        app.setState(data);
    }
};
