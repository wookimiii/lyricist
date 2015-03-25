/** @jsx React.DOM */
var Form = React.createClass({
    render: function(ctrl) {
        var styles = {
            boxSizing: 'border-box',
            width: '100%',
            padding: '10px'
        };

        console.log("Form props: ", this.props);
        return (
            <div style={styles}>
                <textarea id='text' onKeyUp={this.updateText}>{this.props.text}</textarea>
            </div>
        );
    },

    updateText: function(e) {
        console.log("update");
        console.log(e.target.value);
        this.props.update(e.target.value);
    }
    
});

module.exports = Form;
