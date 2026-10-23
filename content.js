document.addEventListener('keydown', onKeyDown, true);

function onKeyDown(event) {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing || event.keyCode === 229) {
        return;
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
    }

    // Shadow DOM retargets event.target to its host outside the shadow root.
    const editor = event.composedPath().map(getDmEditor).find(editor => editor != null);
    if (editor == null || editor.disabled || editor.readOnly) {
        return;
    }

    // Keep the textarea's native newline insertion and undo history.
    event.stopPropagation();
    event.stopImmediatePropagation();
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
