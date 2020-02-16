console.log('ok content js');
$(document).ready(function () {
    let src_image = chrome.extension.getURL("assets/image/icon.png");

    var format_html = '<div id="extension"><div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a class="action-btn">Kích hoạt hoàn tiền</a>  <a class="ignore-btn">Kích hoạt sau</a>  </div></div> </div>';
    $('body').prepend(format_html);


    $('.ignore-btn').on('click', function (e) {
        let extension = $('body').find('#extension');
        console.log(extension);
        if (extension) {
            extension.remove();
        }
    })
    $('.action-btn').on('click', function (e) {
        var format_html = '<div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a class="action-btn">Kích hoạt hoàn tiền</a>  <a class="ignore-btn">Kích hoạt sau</a>  </div></div>';
        $('#extension').html(format_html);
    })


    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        var user = getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                setCookie("username", user, 30);
            }
        }
    }


    let cookie_str = (document.cookie);
    let cookie_split = cookie_str.split("; ");
    let cookie_array = [];
    cookie_split.forEach(function (e) {
        let splite = e.split("=");
        cookie_array[splite[0]] = splite[1];
    })
    // console.log(cookie_array);
    // console.log(cookie_array.TIKI_RECOMMENDATION);
    // console.log(window.location.host);
    //cookie thay doi?. moi~ lan` cap' ko confirm duoc. hcinh' xac' la` cookie cua a Sang hay khong
    switch (window.location.host) {
        case 'tiki.vn':
            if (cookie_array.TIKI_B2B_AFFILIATE_INFO !== undefined) {
                // console.log(`ok co cookie ${cookie_array.TIKI_B2B_AFFILIATE_INFO}`);
            } else {
                // var promt = confirm("Co muon' hoan` tien` ko?");
                // if (promt) {
                //     window.location.href = "https://hoantienmuasam.com/";
                // }
            }
            break;

    }

})