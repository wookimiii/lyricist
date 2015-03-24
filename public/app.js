m.route.mode = "hash";

var mixinLayout = function(layout, nav, body) {
    return function() {
        return layout(nav(), body());
    };
};

var presentationAction = {
    controller: presentationModule.controller,
    view: mixinLayout(layout, menuBar, presentationModule.view)
};

var formAction = {
    controller: form.controller,
    view: mixinLayout(layout, menuBar, form.view)
}

m.route(document.body, "/form", {
    "/": presentationAction,
    "/form": formAction
});


function layout(nav, body) {
    return m("#stage", [ nav, body]);
}
// function loadSlides() {
//     $.getJSON("/pres", function (data) {
//         console.log(data);
//         data.forEach(function (slide) {
//             pres.vm.add(slide);
//         });
//         setTimeout(function() {
//             m.endComputation();
//         }, 30);
//     });
// }
//
// $(function() {
//     loadSlides();
// });

