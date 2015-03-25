/** @jsx React.DOM */
var Slide = React.createClass({
    getDefaultProps: function(){ return { text: "Slide..." } },

    render: function () {
        return (
            <div className='slide' onClick={this.props.onClick}>
                <p className='lyrics'>{this.props.text}</p>
            </div>
        );
    }
});

module.exports = Slide;
