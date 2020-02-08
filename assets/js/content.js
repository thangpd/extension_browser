console.log('extension ok');
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(request);
    }
);
$(document).ready(function () {
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
                console.log(`ok co cookie ${cookie_array.TIKI_B2B_AFFILIATE_INFO}`);
            } else {
                var promt = confirm("Co muon' hoan` tien` ko?");
                if (promt) {
                    window.location.href = "https://hoantienmuasam.com/";
                }
            }
            break;
    }

})