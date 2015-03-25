/** @jsx React.DOM */
var Form = React.createClass({
    render: function() {
        console.log("Render form");
        var styles = {
            boxSizing: 'border-box',
            width: '100%',
            padding: '10px'
        };

        return (
            <div style={styles}>
                <textarea id='text' onChange={this.updateText} onKeyUp={this.updateText} value={this.props.text}></textarea>
            </div>
        );
    },

    updateText: function(e) {
        this.props.update(e.target.value);
    }

});

module.exports = Form;
