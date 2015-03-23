m.route.mode = "hash";

m.route(document.body, "/form", {
    "/": presentationModule,
    "/form": form
});

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

