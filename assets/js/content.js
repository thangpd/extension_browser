/*
   "<all_urls>"
 "*://tiki.vn/*"
*/

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

if (chrome.extension != undefined)
    var src_image = chrome.extension.getURL("assets/image/icon.png");
$(document).ready(function () {
    var format_html = '<div id="extension"><div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a href="https://hoantienmuasam.com/" class="action-btn">Kích hoạt hoàn tiền</a>  <a class="ignore-btn">Kích hoạt sau</a>  </div></div> </div>';
    var format_html_exists = '<div id="extension"><div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a href="#" class="action-btn active">Đã kích hoạt</a>  </div></div> </div>';


    if (chrome != undefined)
        chrome.runtime.onMessage.addListener(gotMessage);

    function gotMessage(res, sender, sendResponse) {
        // let cookie = getCookie("testtest");
        // if (cookie == "") {
        //     setCookie("testtest", "testyesah", 1);
        // } else {
        // }
        console.log('okj');
        toogle_popup();
    }

    function toogle_popup() {
        let extension = $(document).find('#extension');
        // console.log(extension);
        if (extension.length === 0) {
            console.log('show popup')
            show_popup();
        } else {
            temp_hide_popup();
        }

    }

    function show_popup() {
        if (check_cookie_if_exists()) {
            $('body').append(format_html_exists);
        } else {
            $('body').append(format_html);
        }
    }

    function success_active() {
        let action_btn = $(document).find('#extension .action-btn');
        console.log(action_btn);
        action_btn.addClass('active');
        action_btn.html('Đã Kích Hoạt');
    }

    function auto_hide_when_exists() {
        if (check_cookie_if_exists()) {
            $(document).find('.ignore-btn').html('');
            let content = $(document).find('#extension .content');
            content.append('<div class="auto-turn-off"></div>');
            let i = 3;
            var interval_stop = setInterval(function (e) {
                if (i === 0) {
                    set_cookie_temp_hide();
                    temp_hide_popup();
                    clearInterval(interval_stop);
                    return '';
                }
                $(document).find('.auto-turn-off').html('Sẽ tắt trong ' + i + ' giây');
                i--;

            }, 1000, i);
            // console.log(content);
        }
    }

    function temp_hide_popup() {
        let extension = $(document).find('#extension');
        if (extension) {
            extension.remove();
        }
    }

    function check_cookie_if_exists() {
        switch (window.location.host) {
            case 'tiki.vn':
                let cookie_tiki = getCookie("TIKI_B2B_AFFILIATE_INFO");
                console.log('ok');
                console.log(cookie_tiki)
                if (cookie_tiki !== "") {
                    success_active();
                    return true;
                } else {
                    if (getCookie("temp_hide_extension") === "") {
                        return false;
                    }
                }
                break;
            default:
                return false;
        }
    }

    function set_cookie_temp_hide() {
        setCookie("temp_hide_extension", "yes", 1);
    }

    $(document).on('click', '.action-btn', function (e) {
        auto_hide_when_exists();
    }).on('click', '.ignore-btn', function (e) {
        set_cookie_temp_hide();
        temp_hide_popup();
    })

    show_popup();
    auto_hide_when_exists();
    $('body').append(format_login_form);
})

$(".email-signup").hide();
$("#signup-box-link").click(function(){
    $(".email-login").fadeOut(100);
    $(".email-signup").delay(100).fadeIn(100);
    $("#login-box-link").removeClass("active");
    $("#signup-box-link").addClass("active");
});
$("#login-box-link").click(function(){
    $(".email-login").delay(100).fadeIn(100);;
    $(".email-signup").fadeOut(100);
    $("#login-box-link").addClass("active");
    $("#signup-box-link").removeClass("active");
});



