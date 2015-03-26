/** @jsx React.DOM */
var cx = require('classnames');
var touchStart = null;

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
            <div className={className} onClick={this.props.onClick} onTouchStart={this.touchStart}>
                <p className='lyrics'>{lines}</p>
            </div>
        );
    },
    touchStart: function (e) {
        // e.preventDefault();
        touchStartTime = new Date();
    },
    touchEnd: function (e) {
        var touchEndTime = new Date();
        if (touchEndTime - touchStartTime < 500) {
            this.props.onClick();
        }
    }
});

module.exports = Slide;
