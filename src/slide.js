/** @jsx React.DOM */
var cx = require('classnames');

var Slide = React.createClass({
    getDefaultProps: function(){ return { text: "Slide..." } },

    render: function () {
        var className =  cx('slide', this.props.className);      
        return (
            <div className={className} onClick={this.props.onClick}>
                <p className='lyrics'>{this.props.text}</p>
            </div>
        );
    }
});

module.exports = Slide;
