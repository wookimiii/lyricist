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
            borderLeft: "1px solid rgba(0,0,0,0.14)"
        };

        var attrs = {
            className: 'menu',
            style: style,
            onMouseOver: this.show,
            onMouseLeave: this.hide
        };
        var overlay = "";
        if (this.state.visible) {
           overlay = <div className='overlay' style={this.overlayStyles()}/> 
        }

        return (
                <div>
                    <div {...attrs}>
                        <h3>Navigate</h3>
                        <a onClick={this.gotoPage.bind(null, "form")}>Edit</a>
                        <a onClick={this.gotoPage.bind(null, "presentation")}>Present</a>
                        <a onClick={this.props.toggleVerseMode}>Verse Mode</a>
                        <a onClick={this.props.toggleBlackout}>Blackout</a>
                    </div>
                    {overlay}
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
        this.props.gotoPage(page);
    },
    overlayStyles: function () {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 3
        };
    }

});

module.exports = MenuBar;
