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
const quizForm = document.querySelector("#quiz-form");
const quizQuestionsContainer = document.querySelector("#quiz-questions");
const quizSummary = document.querySelector("#quiz-summary");
const resetQuizButton = document.querySelector("#reset-quiz");
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
const quizQuestions = [
  {
    question: "1. What is HTML mainly used for on a web page?",
    name: "q1",
    answer: "structure",
    explanation:
      "HTML gives the page structure and meaning. CSS handles appearance, and JavaScript handles behavior.",
    wrong: {
      color:
        "That choice fits CSS more than HTML. The site explains that CSS styles the page, while HTML builds its structure.",
      behavior:
        "That choice fits JavaScript. HTML is the foundation that organizes content before behavior is added."
    },
    options: [
      { value: "structure", label: "To structure and organize content" },
      { value: "color", label: "To add colors and visual design" },
      { value: "behavior", label: "To control interactivity and page logic" }
    ]
  },
  {
    question: "2. Which part of an HTML document contains visible page content?",
    name: "q2",
    answer: "body",
    explanation:
      "The <body> contains the content users see on the page. The <head> stores metadata like the title and linked files.",
    wrong: {
      head:
        "The <head> is for metadata, not visible page content. The lesson on page anatomy covers this directly.",
      title:
        "The <title> only sets the browser tab text. Visible content belongs inside the <body>."
    },
    options: [
      { value: "head", label: "<head>" },
      { value: "body", label: "<body>" },
      { value: "title", label: "<title>" }
    ]
  },
  {
    question: "3. What does an attribute do in HTML?",
    name: "q3",
    answer: "extra-info",
    explanation:
      "Attributes add extra information to an element, like href on links or src on images.",
    wrong: {
      close:
        "Closing tags finish an element, but attributes do something different: they add extra details to it.",
      style-only:
        "Attributes are not only for styling. They can define destinations, sources, ids, types, and more."
    },
    options: [
      { value: "close", label: "It closes an element" },
      { value: "extra-info", label: "It adds extra information to an element" },
      { value: "style-only", label: "It is only used to style text" }
    ]
  },
  {
    question: "4. Which tag is best for the main heading of a page?",
    name: "q4",
    answer: "h1",
    explanation:
      "An <h1> is the top-level heading and starts the content hierarchy on a page.",
    wrong: {
      p:
        "A <p> is a paragraph, not a heading. Headings should use <h1> through <h6>.",
      div:
        "A <div> is a generic container. It does not provide heading meaning like <h1> does."
    },
    options: [
      { value: "p", label: "<p>" },
      { value: "h1", label: "<h1>" },
      { value: "div", label: "<div>" }
    ]
  },
  {
    question: "5. Which tag should you use to create a link?",
    name: "q5",
    answer: "a",
    explanation:
      "The <a> tag creates links, usually with an href attribute that points to a destination.",
    wrong: {
      img:
        "An <img> displays an image. It does not create a link by itself.",
      li:
        "An <li> creates a list item. Links should use the <a> tag."
    },
    options: [
      { value: "img", label: "<img>" },
      { value: "a", label: "<a>" },
      { value: "li", label: "<li>" }
    ]
  },
  {
    question: "6. Why is semantic HTML useful?",
    name: "q6",
    answer: "meaning",
    explanation:
      "Semantic HTML helps describe what each part of a page means, which improves clarity and accessibility.",
    wrong: {
      shorter:
        "Semantic HTML is not mainly about writing less code. It is about giving content the right meaning.",
      animation:
        "Animations come from CSS or JavaScript. Semantic HTML helps define the role of content."
    },
    options: [
      { value: "shorter", label: "It always makes the page shorter to write" },
      { value: "meaning", label: "It gives content clearer meaning and structure" },
      { value: "animation", label: "It automatically adds animation effects" }
    ]
  },
  {
    question: "7. Which semantic tag is meant for a group of navigation links?",
    name: "q7",
    answer: "nav",
    explanation:
      "The <nav> element is meant for important navigation links on a page.",
    wrong: {
      footer:
        "A <footer> is closing content for a page or section, not the main navigation area.",
      article:
        "An <article> is standalone content like a post or story, not a navigation block."
    },
    options: [
      { value: "footer", label: "<footer>" },
      { value: "nav", label: "<nav>" },
      { value: "article", label: "<article>" }
    ]
  },
  {
    question: "8. Which tag connects text to a form input for better usability?",
    name: "q8",
    answer: "label",
    explanation:
      "A <label> tells users what an input is for and improves accessibility and usability.",
    wrong: {
      button:
        "A <button> triggers an action, but it does not describe an input field.",
      section:
        "A <section> groups content, but it does not label form controls."
    },
    options: [
      { value: "button", label: "<button>" },
      { value: "section", label: "<section>" },
      { value: "label", label: "<label>" }
    ]
  },
  {
    question: "9. Which line tells the browser to use modern HTML standards?",
    name: "q9",
    answer: "doctype",
    explanation:
      "The <!DOCTYPE html> declaration tells the browser to render the page using modern HTML rules.",
    wrong: {
      html:
        "The <html> tag starts the document, but <!DOCTYPE html> is what signals the HTML standard mode.",
      meta:
        "A <meta> tag can define metadata, but it does not replace the <!DOCTYPE html> declaration."
    },
    options: [
      { value: "html", label: "<html lang=\"en\">" },
      { value: "doctype", label: "<!DOCTYPE html>" },
      { value: "meta", label: "<meta charset=\"UTF-8\" />" }
    ]
  },
  {
    question: "10. Which tag is a generic container when no semantic tag fits better?",
    name: "q10",
    answer: "div",
    explanation:
      "A <div> is a generic container used when there is no more meaningful semantic element available.",
    wrong: {
      main:
        "A <main> has a very specific job: it marks the page's primary content.",
      h2:
        "An <h2> is a heading, not a generic container."
    },
    options: [
      { value: "main", label: "<main>" },
      { value: "div", label: "<div>" },
      { value: "h2", label: "<h2>" }
    ]
  }
];

function updatePreview(markup) {
  previewFrame.srcdoc = markup;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderQuiz() {
  const markup = quizQuestions
    .map((item) => {
      const options = item.options
        .map(
          (option) => `
            <label class="quiz-option">
              <input type="radio" name="${item.name}" value="${option.value}" />
              <span>${escapeHtml(option.label)}</span>
            </label>
          `
        )
        .join("");

      return `
        <article class="quiz-card" data-question="${item.name}">
          <h3>${escapeHtml(item.question)}</h3>
          <div class="quiz-options">
            ${options}
          </div>
          <div class="quiz-feedback" id="feedback-${item.name}" hidden></div>
        </article>
      `;
    })
    .join("");

  quizQuestionsContainer.innerHTML = markup;
}

function evaluateQuiz(event) {
  event.preventDefault();

  const formData = new FormData(quizForm);
  let score = 0;

  quizQuestions.forEach((item) => {
    const chosen = formData.get(item.name);
    const feedback = document.querySelector(`#feedback-${item.name}`);

    feedback.hidden = false;

    if (!chosen) {
      feedback.className = "quiz-feedback incorrect";
      feedback.textContent =
        "No answer selected yet. Pick one option and use the lesson above as a guide.";
      return;
    }

    if (chosen === item.answer) {
      score += 1;
      feedback.className = "quiz-feedback correct";
      feedback.textContent = `Correct. ${item.explanation}`;
      return;
    }

    feedback.className = "quiz-feedback incorrect";
    feedback.textContent =
      item.wrong[chosen] || `Not quite. ${item.explanation}`;
  });

  quizSummary.textContent = `You got ${score} out of ${quizQuestions.length} correct. Review the feedback below each question to see what to fix.`;
}

function resetQuiz() {
  quizForm.reset();
  quizSummary.textContent =
    "Answer all 10 questions, then check your work to see detailed feedback.";

  quizQuestions.forEach((item) => {
    const feedback = document.querySelector(`#feedback-${item.name}`);
    feedback.hidden = true;
    feedback.className = "quiz-feedback";
    feedback.textContent = "";
  });
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

quizForm.addEventListener("submit", evaluateQuiz);
resetQuizButton.addEventListener("click", resetQuiz);

renderQuiz();
resetQuiz();
loadExample("blank");
