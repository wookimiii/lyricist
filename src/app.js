/** @jsx React.DOM */

// var React = require('react');
window.React = React;

var Presentation = require('./presentation.js');
var MenuBar = require('./MenuBar.js');
var Form = require('./Form.js');

var App = React.createClass({
    getInitialState: function () {
        return {
            page: "form",
            text: "Welcome to the Slide Show;;This is the end"
        };
    },
    render: function() {
        console.log(this.state);
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
           "presentation": <Presentation text={this.state.text}/>,
           "form": this.form()
       }
       return pages[page];
    },

    form: function () {
        return (
            <Form text={this.state.text} update={this.updateText.bind(this)}/>
        );
    },

    updateText: function(text) {
        this.setState({text: text});
    },
    gotoPage: function(page) {
        this.setState({page: page});
    }
});



React.render(<App />, document.body);
