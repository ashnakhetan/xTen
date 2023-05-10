// Utility to detect highlighted text in a textarea

function detectHighlightedText(textarea) {
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log("highlihgt");
    return selectedText;
}