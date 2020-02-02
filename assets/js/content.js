console.log('extension ok');


$(document).ready(function () {

    var firstHref = $("a[href^='http']");
    if (firstHref !== "undefined") {
        firstHref.each(function (e) {
            console.log('e');
            console.log(e);
            console.log('baseuri');
            console.log($(this)[0].baseURI);
        })
    } else {
        console.log('href tim khong thay');
    }
})