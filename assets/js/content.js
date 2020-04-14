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


function setStorage(obj) {
    if (typeof (obj) === Object) {
        chrome.storage.sync.set(obj, function () {
            console.log('Value is set to ' + value);
        });
    } else {
        console.log('Set storage, input param must be object');
    }
}

function getStorage(key) {
    console.log(key);
    chrome.storage.sync.get(null, function (result) {
        console.log(result);
    });
}


var src_image = chrome.extension.getURL("assets/image/icon48.png");
$(document).ready(function () {
    var params = '?site=' + window.location.host;
    var url_redirect = 'http://localhost/hoantien/auth-page'
    var format_html = '<div id="extension"><div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a href="' + url_redirect + '" class="hoantien_action-btn">Kích hoạt hoàn tiền</a>  <a class="ignore-btn">Kích hoạt sau</a>  </div></div> </div>';
    var format_html_exists = '<div id="extension"><div class="ext-banner ext-banner-2" style="background-image: url(\'' + src_image + '\');"> <div class="content"><a href="#" class="hoantien_action-btn active">Đã kích hoạt</a>  </div></div> </div>';


    /*var format_login_signup = '<div class="login-box"> <div class="lb-header"><a href="#" class="active" id="login-box-link">Login</a> <a href="#" id="signup-box-link">Sign Up</a> <button class="login-box-close">X</button> </div> <div class="social-login"><a href="#"> <i class="fa fa-facebook fa-lg"></i> Login in with facebook </a> <a href="#"> <i class="fa fa-google-plus fa-lg"></i> log in with Google </a></div> <form class="email-login"> <div class="u-form-group"><input type="text" class="hoantien_user" placeholder="User"/></div> <div class="u-form-group"><input type="password" class="hoantien_password" placeholder="Password"/></div> <div class="u-form-group"> <button class="hoantien_login">Log in</button> </div> </form> <form class="email-signup"> <div class="u-form-group"><input type="text" class="hoantien_display" placeholder="Display Name"/></div> <div class="u-form-group"><input type="text" class="hoantien_user" placeholder="User"/></div> <div class="u-form-group"><input type="password" class="hoantien_password" placeholder="Password"/></div> <div class="u-form-group"> <button class="hoantien_signup">Sign Up</button> </div> </form> </div>';


    $('body').append(format_login_signup);
    $(".email-signup").hide();
    $("#signup-box-link").click(function () {
        $(".email-login").fadeOut(100);
        $(".email-signup").delay(100).fadeIn(100);
        $("#login-box-link").removeClass("active");
        $("#signup-box-link").addClass("active");
    });
    $("#login-box-link").click(function () {
        $(".email-login").delay(100).fadeIn(100);
        $(".email-signup").fadeOut(100);
        $("#login-box-link").addClass("active");
        $("#signup-box-link").removeClass("active");
    });*/
    chrome.runtime.onMessage.addListener(gotMessage);

    function gotMessage(res, sender, sendResponse) {
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
        let action_btn = $(document).find('#extension .hoantien_action-btn');
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

    $(document).on('click', '.hoantien_action-btn', function (e) {
        auto_hide_when_exists();
    }).on('click', '.ignore-btn', function (e) {
        set_cookie_temp_hide();
        temp_hide_popup();
    })

    show_popup();
    auto_hide_when_exists();

    /*
        $('button.hoantien_login').on('click', function (e) {
            e.preventDefault();
            console.log('login');
            let user = $(document).find('.email-login .hoantien_user').val();
            console.log(user);

            if (user && false) {
                var res = getNonceUser();
                console.log(res);
                if (res.nonce) {
                    var cookie_generated = generateCookie(res.nonce);
                    console.log(cookie_generated);
                } else {
                    console.log('missing nonce');
                }
            }
        })
        $('button.hoantien_signup').on('click', function (e) {
            e.preventDefault();
            console.log('signup');
            var url = '';
            $.ajax({
                method: "POST",
                url: url,
            }).done(function (res) {
                console.log(res);
            })

        });

        function validateCookieUser() {

        }


        function generateCookie(nonce, user, pass) {
            if (nonce && user && pass) {
                var url = 'https://hoantienmuasam.com/api/user/generate_auth_cookie/?nonce=' + nonce + '&username=' + user + '&password=' + pass;
                var res = $.ajax({
                    method: "POST",
                    url: url,
                    async: false,
                }).done(function (res) {
                    console.log(res);
                    return res;
                })
                return res.responseJSON;
            } else {
                console.log('Missing Nonce or user or pass');
            }
        }


        function getNonceUser() {
            var url = 'https://hoantienmuasam.com/api/get_nonce/?controller=user&method=generate_auth_cookie';
            var res = $.ajax({
                method: "POST",
                url: url,
                async: false,
            }).done(function (res) {
                return res;
            })
            return res.responseJSON;
        }*/
});








