const examples = {
  blank: `<!-- Type any HTML here and experiment freely -->
<main>
  <h1>My HTML Sandbox</h1>
  <p>Start typing tags and watch the preview update.</p>
</main>`,
  profile: `<section style="font-family: Arial, sans-serif; padding: 1rem;">
  <h1>Ada Lovelace</h1>
  <p>Writer, mathematician, and early computing visionary.</p>
  <ul>
    <li>Loves logic</li>
    <li>Studies machines</li>
    <li>Writes notes</li>
  </ul>
</section>`,
  article: `<article style="font-family: Georgia, serif; padding: 1rem;">
  <header>
    <h1>Why Semantic HTML Matters</h1>
    <p>Published in Web Weekly</p>
  </header>
  <p>Semantic tags help describe the role of content on a page.</p>
  <p>That makes your markup easier to maintain and more accessible.</p>
</article>`,
  form: `<form style="font-family: Arial, sans-serif; padding: 1rem;">
  <label for="name">Name</label><br />
  <input id="name" type="text" placeholder="Jamie" /><br /><br />

  <label for="email">Email</label><br />
  <input id="email" type="email" placeholder="jamie@example.com" /><br /><br />

  <button type="submit">Join Newsletter</button>
</form>`
};

const editor = document.querySelector("#html-editor");
const previewFrame = document.querySelector("#preview-frame");
const buttons = document.querySelectorAll(".example-button");
const voidElements = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
const boilerplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
</head>
<body>
  
</body>
</html>`;

function updatePreview(markup) {
  previewFrame.srcdoc = markup;
}

function setEditorValue(value, caretStart = value.length, caretEnd = caretStart) {
  editor.value = value;
  editor.setSelectionRange(caretStart, caretEnd);
  updatePreview(value);
}

function loadExample(exampleKey) {
  const markup = examples[exampleKey];
  setEditorValue(markup);

  buttons.forEach((button) => {
    const isActive = button.dataset.example === exampleKey;
    button.classList.toggle("active", isActive);
  });
}

function insertAtSelection(text, options = {}) {
  const { moveCaretBy = text.length, selectInserted = false } = options;
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const nextValue =
    editor.value.slice(0, start) + text + editor.value.slice(end);
  const caretStart = start + moveCaretBy;
  const caretEnd = selectInserted ? start + text.length : caretStart;
  setEditorValue(nextValue, caretStart, caretEnd);
}

function indentSelection() {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;
  const value = editor.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const selectedText = value.slice(lineStart, end);

  if (selectedText.includes("\n")) {
    const indented = selectedText
      .split("\n")
      .map((line) => `  ${line}`)
      .join("\n");
    const nextValue = value.slice(0, lineStart) + indented + value.slice(end);
    const addedSpaces = indented.length - selectedText.length;
    setEditorValue(nextValue, start + 2, end + addedSpaces);
    return;
  }

  insertAtSelection("  ");
}

function getIndentation(textBeforeCursor) {
  const line = textBeforeCursor.split("\n").pop() || "";
  const match = line.match(/^\s*/);
  return match ? match[0] : "";
}

function isBoilerplateShortcut(textBeforeCursor, textAfterCursor) {
  const currentLine = textBeforeCursor.split("\n").pop() || "";
  return currentLine.trim() === "!" && (textAfterCursor === "" || textAfterCursor[0] === "\n");
}

function expandBoilerplate() {
  const start = editor.selectionStart;
  const value = editor.value;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const lineEndIndex = value.indexOf("\n", start);
  const lineEnd = lineEndIndex === -1 ? value.length : lineEndIndex;
  const beforeLine = value.slice(0, lineStart);
  const afterLine = value.slice(lineEnd);
  const nextValue = beforeLine + boilerplate + afterLine;
  const bodyLine = "<body>\n  ";
  const caret = beforeLine.length + boilerplate.indexOf(bodyLine) + bodyLine.length;
  setEditorValue(nextValue, caret, caret);
}

function autocompleteTag() {
  const start = editor.selectionStart;
  const end = editor.selectionEnd;

  if (start !== end) {
    return false;
  }

  const before = editor.value.slice(0, start);
  const after = editor.value.slice(end);

  if (before.endsWith("</") || before.endsWith("<")) {
    return false;
  }

  const tagMatch = before.match(/<([a-zA-Z][\w:-]*)(?:\s[^<>]*)?$/);

  if (!tagMatch || before.endsWith("/")) {
    return false;
  }

  const tagName = tagMatch[1].toLowerCase();

  if (voidElements.has(tagName)) {
    return false;
  }

  const insertion = `></${tagName}>`;
  const nextValue = before + insertion + after;
  const caret = start + 1;
  setEditorValue(nextValue, caret, caret);
  return true;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    loadExample(button.dataset.example);
  });
});

editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    event.preventDefault();
    indentSelection();
    return;
  }

  if (event.key === "Enter") {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    const before = editor.value.slice(0, start);
    const after = editor.value.slice(end);

    if (isBoilerplateShortcut(before, after)) {
      event.preventDefault();
      expandBoilerplate();
      return;
    }

    const indentation = getIndentation(before);
    const nextChar = after[0];
    const previousChar = before[before.length - 1];

    if (previousChar === ">" && nextChar === "<") {
      event.preventDefault();
      const innerIndent = `${indentation}  `;
      const insertText = `\n${innerIndent}\n${indentation}`;
      const caret = start + innerIndent.length + 1;
      const nextValue = before + insertText + after;
      setEditorValue(nextValue, caret, caret);
      return;
    }
  }

  if (event.key === ">") {
    event.preventDefault();
    if (!autocompleteTag()) {
      insertAtSelection(">");
    }
  }
});

editor.addEventListener("input", (event) => {
  updatePreview(event.target.value);
});

loadExample("blank");
