// pres is for Presentation
var pres = {}
pres.Slide = function (data) {
    this._data = data;
    this.text = data.text;
    this.htmlText = function () {
        var result = [];
        var lines = this.text.split("\n");;
        lines.forEach(function (l) {
            result.push(l);
            result.push(m("br"));
        });
        return result;
    }
};

pres.Slides = Array;

// View-Model
pres.vm = (function () {
    var vm = {};
    vm.init = function () {
        vm.slides = new pres.Slides();

        // index of the current slide
        vm.current = m.prop(0);
    }

    vm.add = function add(text) {
        var slide = new pres.Slide({text: text});
        vm.slides.push(slide);
    }

    vm.goTo = function select(index) {
        console.log(index);
        vm.current(index);
    }

    vm.yPosition = function () {
        console.log("updating y position", vm.current());
        var currentSlide = getCurrentDiv();
        if (!currentSlide) return;
        var offset = getSlideOffset(vm.current());
        console.log("a", offset)
        offset = (window.innerHeight/2) - offset;
        console.log("b", offset)
        return offset + 'px';
    }

    function getCurrentDiv() {
        return document.getElementsByClassName("slide")[vm.current()];
    }

    function getSlideOffset(index) {
        var slides = document.getElementsByClassName("slide");
        var height = 0;
        for (var i=0; i < index; i++) {
            height = height + slides[i].clientHeight; 
        }
        height = height + (slides[i].clientHeight/2);
        console.log("slides height", height)
        return height;
    }

    return vm;
})();

pres.controller = function () {
    pres.vm.init();
}

pres.view = function view() {
    return m("div#wrapper", {style: {height: window.innerHeight + 'px'}},
        m("div#presentation", {style: {top: pres.vm.yPosition()}},
            [ //m("div.space"),
                slidesView(),
                m("div.space"),
                m("div.marker"),
                m("div#debug", pres.vm.yPosition())]
        )
    );
}

function slidesView() {
    return pres.vm.slides.map(function(slide, i) {
        return m("div.slide", {onclick: pres.vm.goTo.bind(pres.vm, i)}, [
                 m("div.lyrics", slide.htmlText())
        ]);
    });
}

var body = document.getElementsByTagName("body")[0];
m.module(body, {controller: pres.controller, view: pres.view});

function loadSlides() {
    m.startComputation();
    pres.vm.add("Slide1");
    pres.vm.add("Slide2\nwith multiple\nlines");
    pres.vm.add("Slide3\nwith 3\nlines");
    m.endComputation();
}

loadSlides();
