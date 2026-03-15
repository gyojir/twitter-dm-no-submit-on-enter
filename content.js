document.addEventListener('keydown', onKeyDown, true);

function onKeyDown(event) {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
        return;
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    const editor = getDmEditor(event.target);
    if (editor == null) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    insertLineBreak(editor);
}

function getDmEditor(target) {
    if (!(target instanceof Element)) {
        return null;
    }

    const editor = target.closest('textarea');
    if (editor == null) {
        return null;
    }
    
    return isInsideDmComposer(editor) ? editor : null;
}

function isInsideDmComposer(element) {
    return element.closest('[data-testid="dm-composer-textarea"]') != null;
}

function insertLineBreak(editor) {
    const start = editor.selectionStart ?? editor.value.length;
    const end = editor.selectionEnd ?? editor.value.length;
    const nextValue = editor.value.slice(0, start) + '\n' + editor.value.slice(end);

    editor.value = nextValue;
    editor.selectionStart = start + 1;
    editor.selectionEnd = start + 1;
    editor.dispatchEvent(new InputEvent('beforeinput', {
        bubbles: true,
        cancelable: true,
        inputType: 'insertLineBreak',
        data: null
    }));
    editor.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertLineBreak',
        data: null
    }));
}