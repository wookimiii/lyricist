var form = {};

form.controller = function() {
   this.text = TEXT || ""; 
}

form.view = function(ctrl) {
    return [
        menuBar(),
        m("div#container",[
            m("textarea#text", {value: ctrl.text}),
            m("input#submit", {
                type: 'submit',
                onclick: form.submit
            })
        ])
    ];
}

form.submit = function (e) {
    console.log(e);
    TEXT = $("#text").val();
    m.route("/");
}
