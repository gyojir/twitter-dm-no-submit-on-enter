const checkIntervalID = setInterval(check, 1000);
function check() {
    const elem = document.querySelector('[data-testid~="DMDrawer"]');
    if(elem != null) {
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