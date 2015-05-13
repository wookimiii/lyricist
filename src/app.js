/** @jsx React.DOM */

// var React = require('react');
React.initializeTouchEvents(true)

var Presentation = require('./presentation.js');
var MenuBar = require('./MenuBar.js');
var Form = require('./form.js');
var Connection = require('./connection.js');
var app = null;

var key = require('keymaster');

var App = React.createClass({
    getInitialState: function () {
        return {
            page: "presentation",
            text: "Welcome to the Slide Show!",
            blackOut: false,
            currentSlide: 0
        };
    },
    render: function() {
        var page = this.state.page;
        return (
            <div onKeyPress={this.handleKeyPress}>
                <MenuBar gotoPage={this.gotoPage} toggleBlackout={this.toggleBlackout}/>
                {this.show(page)}
                <div id='blackout' className={this.state.blackout ? '' : 'hidden'}></div>
            </div>
        );
    },

    show: function (page) {
       var pages = {
           "presentation": this.presentation(),
           "form": this.form(),
       };
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
            gotoSlide: this.gotoSlide
        };

        return (
            <Presentation {...props} />
        );
    },

    updateText: function(text) {
        this.setState({text: text});
        connection.broadcast({text: text});
    },

    gotoSlide: function(i) {
        this.setState({currentSlide: i});
        connection.broadcast({currentSlide: i});
    },

    gotoPage: function(page) {
        this.setState({page: page});
    },

    toggleBlackout: function () {
        this.setState({blackout: !this.state.blackout});
    },

    componentDidUpdate: function (prevProps, prevState) {
        // console.log("Update to server:", this.state);
    },

    componentDidMount: function () {
        key('space', this.toggleBlackout);
        key('p', this.gotoPage.bind(null, 'presentation'));
        key('e', this.gotoPage.bind(null, 'form'));
    },

    componentWillUnmount: function () {
        key.unbind('space');
        key.unbind('p');
        key.unbind('e');
    }
});

function onConnect() {
    // console.log('open');
    app = React.render(<App />, document.body);
    connection.broadcast({sys: "id", id: ID});
    connection.broadcast({sys: "sync"});
}

function onMessage(data) {
    if (data.sys === "sync") {
        connection.broadcast({
            text: app.state.text,
            currentSlide: app.state.currentSlide
        });
        return;
    }

    if (data.text && data.text !== app.state.text) {
        app.setState(data);
    }

    if (typeof data.currentSlide != 'undefined' && data.currentSlide !== app.state.currentSlide) {
        app.setState(data);
    }
}

// connect to the server and start the app
var connection = new Connection({
    onConnect: onConnect,
    onMessage: onMessage
});
