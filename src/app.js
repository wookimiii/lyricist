/** @jsx React.DOM */

// var React = require('react');
window.React = React;

var Presentation = require('./presentation');
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Presentation />
            </div>
        );
    }
});

React.render(<App />, document.body);
