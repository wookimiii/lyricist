
var fs = require('fs');
function getFile(filename) {
    var slides = fs.readFileSync(filename).toString();
    slides = splitBySlides(slides);
    slides = slides.map(slideToHtml);
    return slides;
}

var SLIDE_SPLIT_EXP = new RegExp("^\s*$", "m");;
function splitBySlides(str) {
    return str.split(SLIDE_SPLIT_EXP).map(function (s) {return s.trim()});
}

function slideToHtml(str){
    var result = [];
    var lines = str.split("\n");;
    lines.forEach(function (l) {
        result.push(l);
        result.push("<br />");
    });
    return result.join("");
}

function parse(filename) {
    return getFile(filename);
}

module.exports = {
    parse: parse
};
