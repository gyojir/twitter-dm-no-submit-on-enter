// 1. If "Messages" page: get DOM
// 2. Other page: get just "DM window" DOM
// 3. Prevent Enter keydown within the DOM

const checkIntervalID = setInterval(check, 1000);

// when clicked, check URL. If URL changed, re-define the DOM
window.addEventListener('click', function () {
    check();
})

function check() {
    var elem;

    // if it is "Messages" page, get different DOM
    if (isMessagePage()) {
        elem_array = document.xpath('//*[@id="react-root"]/div/div/div[2]/main');
        if (elem_array.length > 0) {
            elem = elem_array[0];
        }
    }
    else {
        elem = document.querySelector('[data-testid~="DMDrawer"]');
    }

    if (elem != null) {
        elem.onkeydown = onkeydown;
        clearInterval(checkIntervalID);
    }
}

function onkeydown(e) {
    if(e.key === 'Enter' && !e.shiftKey && e.target.classList.contains("public-DraftEditor-content")) {
        e.target.dispatchEvent(new KeyboardEvent('keydown', {'key':'Enter', 'code': 'Enter', which: 13, keyCode: 13, bubbles: true, shiftKey: true}));
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
}

// check URL to know if it is "Messages" page or not
function isMessagePage() {
    var page_url = location.href;
    const message_url_pattern = /https:\/\/twitter.com\/messages/;
    if (message_url_pattern.test(page_url)) {
        return true;
    }
    else {
        return false;
    }
}

// to get element by xpath
document.xpath = function (expression) {
    ret = document.evaluate(expression, document, null, XPathResult.ANY_TYPE, null);
    switch (ret.resultType) {
        case 1: return ret.numberValue;
        case 2: return ret.stringValue;
        case 3: return ret.booleanValue;
        case 4:
        case 5:
            var a = [];
            while (e = ret.iterateNext()) { a.push(e); };
            return a;
        default: return ret;
    }
}