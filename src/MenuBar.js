/** @jsx React.DOM */

var MenuBar = React.createClass({
    getInitialState: function () {
        return {
            visible: false
        };
    },

    render: function () {
        var style = {
            opacity: this.state.visible ? 1 : 0,
        };

        var attrs = {
            className: 'menu',
            style: style,
            onMouseOver: this.show,
            onMouseLeave: this.hide
        };

        return (
            <div {...attrs}>
                <h3>Navigate</h3>
                <a onClick={this.gotoPage.bind(null, "form")}>Edit</a>
                <a onClick={this.gotoPage.bind(null, "presentation")}>Present</a>
            </div>
               );
    },

    show: function () {
        this.setState({visible: true});
    },

    hide: function () {
        this.setState({visible: false});
    },
    gotoPage: function (page) {
        console.log(page);
        console.log(this.props);
        this.props.gotoPage(page);
    }

});

module.exports = MenuBar;
