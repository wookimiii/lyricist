// pres is for Presentation
var presentationModule = (function() {
    var module = {};
    module.Slide = function (data) {
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

    // View-Model
    module.vm = (function () {
        var vm = {};
        vm.init = function () {
            // index of the current slide
            vm.current = m.prop(-1);
        }

        vm.goTo = function select(index) {
            vm.current(index);
        }

        vm.yPosition = function () {
            var currentSlide = getCurrentDiv();
            if (!currentSlide) return;
            var offset = getSlideOffset(vm.current());
            offset = (window.innerHeight/2) - offset;
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
            return height;
        }

        return vm;
    })();

    module.controller = function () {
        this.text = TEXT + "";
        module.vm.init();
        this.slides = splitBySlides(this.text).map(function (s) {
            return new module.Slide({text:s});
        });
    }

    module.view = function view(ctrl) {
        console.log(ctrl);
        return m("div#wrapper", {style: {height: window.innerHeight + 'px'}},
            m("div#presentation", {style: {top: module.vm.yPosition()}},
                [   slidesView(ctrl.slides),
                    m("div.space"),
                    m("div.marker"),
                    m("div#debug", module.vm.yPosition())]
            )
        );
    }

    function slidesView(slides) {
        return slides.map(function(slide, i) {
            var current =  (module.vm.current()) === i ? 'current' : "";
            return m("div.slide", {onclick: module.vm.goTo.bind(module.vm, i), class: current}, [
                     m("p.lyrics", slide.htmlText())
            ]);
        });
    }

    var SLIDE_SPLIT_EXP = new RegExp("^\s*$", "m");;
    function splitBySlides(str) {
        return str.split(SLIDE_SPLIT_EXP).map(function (s) {return s.trim()});
    }
    return module;
})();
