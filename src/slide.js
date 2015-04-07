/** @jsx React.DOM */
var cx = require('classnames');
var Hammer = require('./HammerComponent');

var Slide = React.createClass({
    getDefaultProps: function(){ return { text: "Slide..." } },

    render: function () {
        var className =  cx('slide', this.props.className);
        var text = this.props.text.split("\n");
        var lines = [];
        for (var i = 0; i < text.length; i++) {
            lines.push(text[i]);
            lines.push(<br />);
        }

        return (
            <Hammer component='div' className={className} onTap={this.props.onClick}>
                <p className='lyrics'>{lines}</p>
            </Hammer>
        );
    }
});

module.exports = Slide;
