/** @jsx React.DOM */
// pres is for Presentation
var Slide = require('./slide');
var key = require('keymaster');

var SLIDE_SPLIT_EXP = new RegExp("(^\s*$)|(;;)", "m");
function splitBySlides(str) {
    var slides = [];
    var parsed = str.split(SLIDE_SPLIT_EXP);
    for(var i=0; i < parsed.length; i++) {
        if (parsed[i] ) {
            slides.push(parsed[i].trim());
        }
    }
    return slides;
}

var Presentation = React.createClass({
    getDefaultProps: function () {
       return {
           current: 0,
           text: "Welcome to the Slide Show blah",
       };
    },

    getTopPosition: function (index) {
        var slides = document.getElementsByClassName("slide");
        var height = 0;
        var toppx = 0;
        index = Math.min(slides.length, index);
        // early return
        if (slides.length === 0) return 0;

        // iterate through all the slides above this one
        for (var i=0; i < index; i++) {
            height = height + slides[i].clientHeight;
        }

        // plus 1/2 the height of the current slide
        // height = height + (slides[i].clientHeight/2);

        // match the top of the window
        toppx = (window.innerHeight/10) - height;
        return toppx;
    },

    render: function () {
        var pres = this;
        var textList = splitBySlides(this.props.text);
        var slides = textList.map(function(t, i) {
            var className = pres.props.current  === i ? 'current' : '';
            var onClick = pres.props.gotoSlide.bind(null, i);
            return (
                <Slide className={className} text={t} onClick={onClick}/>
            )
        });

        var presStyle = {
            top: this.getTopPosition(this.props.current) + 'px'
            // top: '0px'
        };

        return (
            <div id='wrapper'>
                <div id='presentation' style={presStyle}>
                    {slides}
                </div>
            </div>
        )
    },

    componentDidMount: function () {
        console.log("Presentation mount", this.props.current);
        // this.props.gotoSlide(this.props.current || 0);
        key('up', this.prevSlide);
        key('down', this.nextSlide);
        setTimeout(this.forceUpdate.bind(this), 1);
    },

    componentWillUnmount: function () {
        key.unbind('up');
        key.unbind('down');
    },

    nextSlide: function () {
        var textList = splitBySlides(this.props.text);
        var next = Math.min(textList.length, this.props.current + 1);
        this.props.gotoSlide(next);
    },

    prevSlide: function () {
        this.props.gotoSlide(Math.max(0, this.props.current - 1));
    }
});

module.exports = Presentation;
