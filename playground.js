const templateSelect = document.querySelector("#template-select");
const challengeSelect = document.querySelector("#challenge-select");
const editorThemeSelect = document.querySelector("#editor-theme-select");
const runButton = document.querySelector("#run-button");
const resetButton = document.querySelector("#reset-button");
const copyButton = document.querySelector("#copy-button");
const downloadButton = document.querySelector("#download-button");
const undoButton = document.querySelector("#undo-button");
const redoButton = document.querySelector("#redo-button");
const formatButton = document.querySelector("#format-button");
const explainButton = document.querySelector("#explain-button");
const completeChallengeButton = document.querySelector("#complete-challenge");
const tabButtons = document.querySelectorAll(".tab-button");
const editorPanes = document.querySelectorAll(".editor-pane");
const deviceButtons = document.querySelectorAll("[data-device]");
const snippetButtons = document.querySelectorAll("[data-snippet]");
const preview = document.querySelector("#playground-preview");
const previewStage = document.querySelector("#preview-stage");
const saveStatus = document.querySelector("#save-status");
const goalTitle = document.querySelector("#goal-title");
const goalDescription = document.querySelector("#goal-description");
const goalChecklist = document.querySelector("#goal-checklist");
const goalStatus = document.querySelector("#goal-status");
const challengeHint = document.querySelector("#challenge-hint");
const issueOutput = document.querySelector("#issue-output");
const explainOutput = document.querySelector("#explain-output");
const consoleOutput = document.querySelector("#console-output");
const historyList = document.querySelector("#history-list");
const xpValue = document.querySelector("#xp-value");
const levelValue = document.querySelector("#level-value");
const badgeValue = document.querySelector("#badge-value");
const progressFill = document.querySelector("#progress-fill");
const progressCopy = document.querySelector("#progress-copy");

const storageKeys = {
  code: "html-atlas-playground-code",
  progress: "html-atlas-playground-progress",
  history: "html-atlas-playground-history"
};

const templates = {
  starter: {
    label: "Starter Sandbox",
    minXp: 0,
    html: `<main class="sandbox">
  <h1>Hello, HTML Atlas</h1>
  <p>Edit the HTML, CSS, and JavaScript tabs to build your own idea.</p>
  <button class="demo-button">Click me</button>
</main>`,
    css: `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 2rem;
  background: #fff8ef;
  color: #1f1a16;
}

.demo-button {
  padding: 0.8rem 1.1rem;
  border: none;
  border-radius: 999px;
  background: #c7512c;
  color: white;
  font-weight: 700;
}`,
    js: `const button = document.querySelector(".demo-button");

button?.addEventListener("click", () => {
  button.textContent = "Nice work!";
});`
  },
  lesson: {
    label: "Lesson Example",
    minXp: 0,
    html: `<article class="lesson-card">
  <h1>Semantic HTML Example</h1>
  <p>Use meaningful tags to describe your content.</p>
  <ul>
    <li>header</li>
    <li>nav</li>
    <li>main</li>
  </ul>
</article>`,
    css: `body {
  font-family: "Trebuchet MS", sans-serif;
  margin: 0;
  padding: 2rem;
  background: linear-gradient(180deg, #fdf5eb, #f1e1cc);
}

.lesson-card {
  max-width: 36rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 18px 40px rgba(31, 26, 22, 0.12);
}`,
    js: `console.log("Lesson template ready.");`
  },
  landing: {
    label: "Landing Page Template",
    minXp: 60,
    html: `<header class="hero">
  <p class="eyebrow">Unlocked template</p>
  <h1>Design a focused landing page</h1>
  <p>Build a clear headline, supporting copy, and a strong call to action.</p>
  <a class="cta" href="#learn-more">Learn more</a>
</header>`,
    css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    radial-gradient(circle at top left, rgba(14, 107, 95, 0.35), transparent 30%),
    linear-gradient(180deg, #10181e, #1b2833);
  color: #f8f3eb;
  font-family: Arial, sans-serif;
}

.hero {
  max-width: 42rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.cta {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.9rem 1.2rem;
  border-radius: 999px;
  background: #f0b46c;
  color: #1f1a16;
  text-decoration: none;
  font-weight: 700;
}`,
    js: `console.log("Landing page template unlocked.");`
  }
};

const challenges = [
  {
    id: "red-button",
    title: "Build a red button",
    description: "Create a button in HTML and style it so it stands out as a red call-to-action.",
    checklist: [
      "Add a <button> element in the HTML tab",
      "Give the button a red background in the CSS tab",
      "Add rounded corners so it looks like a real UI button"
    ],
    hint:
      "Make a button element in HTML and use CSS to give it a red background with rounded corners.",
    check(code) {
      return (
        /<button[\s>]/i.test(code.html) &&
        /(background|background-color)\s*:\s*(red|#f00|#ff0000|rgb\(255,\s*0,\s*0\))/i.test(code.css)
      );
    }
  },
  {
    id: "semantic-layout",
    title: "Build a semantic layout",
    description: "Create a small page structure using meaningful HTML tags instead of generic wrappers.",
    checklist: [
      "Use a <header> element",
      "Use a <main> element for the primary content",
      "Use a <footer> element to close the page"
    ],
    hint:
      "Use semantic structure such as header, main, section, and footer instead of only div tags.",
    check(code) {
      return (
        /<header[\s>]/i.test(code.html) &&
        /<main[\s>]/i.test(code.html) &&
        /<footer[\s>]/i.test(code.html)
      );
    }
  },
  {
    id: "interactive-card",
    title: "Make an interactive card",
    description: "Build a visible content card and use JavaScript to make it react to a user action.",
    checklist: [
      "Create a visible card or panel in HTML",
      "Style the card so it looks distinct",
      "Use JavaScript to change text or style after a click"
    ],
    hint:
      "Create a visible card in HTML and CSS, then use JavaScript to change text or style when a button is clicked.",
    check(code) {
      return /addEventListener/i.test(code.js) && /class=|className|classList/i.test(code.html + code.js);
    }
  }
];

const snippets = {
  hero: `<section class="hero-block">
  <p class="eyebrow">New section</p>
  <h2>Write a bold headline here</h2>
  <p>Add supporting copy that explains the value.</p>
</section>
`,
  cards: `<section class="card-grid">
  <article class="card">Card one</article>
  <article class="card">Card two</article>
  <article class="card">Card three</article>
</section>
`,
  cta: `<a class="call-to-action" href="#next-step">Take the next step</a>
`
};

let activeTab = "html";
let editors;
let autosaveTimer;
let progress = loadProgress();
let hasCodeMirror = typeof CodeMirror !== "undefined";

function safeReadStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function safeWriteStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
}

function loadProgress() {
  return safeReadStorage(storageKeys.progress, {
    xp: 0,
    completedChallenges: [],
    badge: "Explorer"
  });
}

function saveProgress() {
  safeWriteStorage(storageKeys.progress, progress);
}

function getLevel() {
  return Math.max(1, Math.floor(progress.xp / 40) + 1);
}

function getUnlockedTemplates() {
  return Object.entries(templates).filter(([, template]) => progress.xp >= template.minXp);
}

function renderTemplateOptions() {
  const options = Object.entries(templates)
    .map(([key, template]) => {
      const locked = progress.xp < template.minXp;
      const label = locked ? `${template.label} (Unlock at ${template.minXp} XP)` : template.label;
      return `<option value="${key}" ${locked ? "disabled" : ""}>${label}</option>`;
    })
    .join("");

  templateSelect.innerHTML = options;

  const current = templateSelect.value;
  if (!current || templateSelect.options[templateSelect.selectedIndex]?.disabled) {
    templateSelect.value = getUnlockedTemplates()[0][0];
  }
}

function renderChallenges() {
  challengeSelect.innerHTML = challenges
    .map((challenge) => `<option value="${challenge.id}">${challenge.title}</option>`)
    .join("");

  updateChallengeHint();
}

function updateStats() {
  const level = getLevel();
  const completedCount = progress.completedChallenges.length;
  const badge = progress.xp >= 100 ? "Builder" : progress.xp >= 60 ? "Creator" : "Explorer";

  progress.badge = badge;
  xpValue.textContent = String(progress.xp);
  levelValue.textContent = String(level);
  badgeValue.textContent = badge;

  const ratio = Math.min(100, (completedCount / challenges.length) * 100);
  progressFill.style.width = `${ratio}%`;
  progressCopy.textContent =
    completedCount === challenges.length
      ? "All current challenges completed. Keep experimenting or remix the unlocked template."
      : `You have completed ${completedCount} of ${challenges.length} challenges. Reach 60 XP to unlock the landing-page template.`;
}

function createEditors() {
  if (!hasCodeMirror) {
    document.body.classList.add("editor-fallback");
    editors = createTextareaEditors();
    saveStatus.textContent = "Editor fallback active";
    issueOutput.textContent =
      "CodeMirror did not load, so the playground is using plain textareas instead.";
    return;
  }

  editors = {
    html: CodeMirror.fromTextArea(document.querySelector("#html-editor"), {
      mode: "htmlmixed",
      lineNumbers: true,
      lineWrapping: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      theme: editorThemeSelect.value,
      extraKeys: {
        "Ctrl-Space": "autocomplete",
        Tab(cm) {
          if (tryExpandShortcut(cm)) {
            return;
          }

          if (cm.somethingSelected()) {
            cm.indentSelection("add");
            return;
          }

          cm.replaceSelection("  ", "end");
        }
      }
    }),
    css: CodeMirror.fromTextArea(document.querySelector("#css-editor"), {
      mode: "css",
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      theme: editorThemeSelect.value,
      extraKeys: { "Ctrl-Space": "autocomplete" }
    }),
    js: CodeMirror.fromTextArea(document.querySelector("#js-editor"), {
      mode: "javascript",
      lineNumbers: true,
      lineWrapping: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      theme: editorThemeSelect.value,
      extraKeys: { "Ctrl-Space": "autocomplete" }
    })
  };

  Object.values(editors).forEach((editor) => {
    editor.on("change", () => {
      queueAutosave();
      updateIssues();
    });
  });
}

function createTextareaEditors() {
  const map = {
    html: document.querySelector("#html-editor"),
    css: document.querySelector("#css-editor"),
    js: document.querySelector("#js-editor")
  };

  function createAdapter(textarea) {
    textarea.classList.add("fallback-editor");

    return {
      getValue() {
        return textarea.value;
      },
      setValue(value) {
        textarea.value = value;
      },
      on(eventName, callback) {
        if (eventName === "change") {
          textarea.addEventListener("input", callback);
        }
      },
      refresh() {},
      setOption() {},
      replaceSelection(text) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.setRangeText(text, start, end, "end");
      },
      somethingSelected() {
        return textarea.selectionStart !== textarea.selectionEnd;
      },
      indentSelection() {},
      undo() {
        document.execCommand("undo");
      },
      redo() {
        document.execCommand("redo");
      }
    };
  }

  return {
    html: createAdapter(map.html),
    css: createAdapter(map.css),
    js: createAdapter(map.js)
  };
}

function setEditorTheme(theme) {
  if (!hasCodeMirror) {
    return;
  }

  Object.values(editors).forEach((editor) => editor.setOption("theme", theme));
}

function getCode() {
  return {
    html: editors.html.getValue(),
    css: editors.css.getValue(),
    js: editors.js.getValue()
  };
}

function saveHistorySnapshot(code) {
  const history = safeReadStorage(storageKeys.history, []);
  const snapshot = {
    id: Date.now(),
    label: new Date().toLocaleTimeString(),
    code
  };

  history.unshift(snapshot);
  safeWriteStorage(storageKeys.history, history.slice(0, 6));
  renderHistory();
}

function renderHistory() {
  const history = safeReadStorage(storageKeys.history, []);

  if (history.length === 0) {
    historyList.innerHTML = '<p class="panel-copy">No saved runs yet.</p>';
    return;
  }

  historyList.innerHTML = history
    .map(
      (item) => `
        <button class="history-item" type="button" data-history-id="${item.id}">
          Restore snapshot ${item.label}
        </button>
      `
    )
    .join("");

  historyList.querySelectorAll("[data-history-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const historyItems = safeReadStorage(storageKeys.history, []);
      const selected = historyItems.find(
        (entry) => String(entry.id) === button.dataset.historyId
      );

      if (!selected) {
        return;
      }

      applyCode(selected.code);
      runPreview();
      saveStatus.textContent = "Snapshot restored";
    });
  });
}

function applyCode(code) {
  editors.html.setValue(code.html);
  editors.css.setValue(code.css);
  editors.js.setValue(code.js);
}

function queueAutosave() {
  window.clearTimeout(autosaveTimer);
  saveStatus.textContent = "Saving...";

  autosaveTimer = window.setTimeout(() => {
    const payload = {
      template: templateSelect.value,
      editorTheme: editorThemeSelect.value,
      code: getCode()
    };

    const saved = safeWriteStorage(storageKeys.code, payload);
    saveStatus.textContent = saved ? "Saved locally" : "Autosave unavailable";
  }, 180);
}

function loadSavedWorkspace() {
  const parsed = safeReadStorage(storageKeys.code, null);

  if (!parsed) {
    loadTemplate(templateSelect.value);
    return;
  }

  if (parsed.template && !templateSelect.querySelector(`option[value="${parsed.template}"]`)?.disabled) {
    templateSelect.value = parsed.template;
  }

  if (parsed.editorTheme) {
    editorThemeSelect.value = parsed.editorTheme;
  }

  applyCode(parsed.code);
  setEditorTheme(editorThemeSelect.value);
  runPreview();
}

function wrapDocument(code) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>${code.css}</style>
  </head>
  <body>
${code.html}
    <script>
      const __consoleLog = console.log;
      console.log = function (...args) {
        parent.postMessage({ source: "html-atlas-playground", type: "log", payload: args.join(" ") }, "*");
        __consoleLog.apply(console, args);
      };

      window.onerror = function (message) {
        parent.postMessage({ source: "html-atlas-playground", type: "error", payload: String(message) }, "*");
      };
    <\/script>
    <script>${code.js}<\/script>
  </body>
</html>`;
}

function runPreview() {
  const code = getCode();
  preview.srcdoc = wrapDocument(code);
  consoleOutput.textContent = "Preview updated.";
  updateIssues();
  saveHistorySnapshot(code);
}

function loadTemplate(templateKey) {
  const template = templates[templateKey];
  applyCode(template);
  queueAutosave();
  runPreview();
}

function updateChallengeHint() {
  const challenge = challenges.find((item) => item.id === challengeSelect.value);
  challengeHint.textContent = challenge ? challenge.hint : "Pick a challenge to get started.";
  goalTitle.textContent = challenge ? challenge.title : "Choose a challenge";
  goalDescription.textContent = challenge
    ? challenge.description
    : "Pick a challenge to see its goal and checklist.";
  goalChecklist.innerHTML = challenge
    ? challenge.checklist.map((item) => `<li>${item}</li>`).join("")
    : "";
  goalStatus.textContent = challenge
    ? 'Complete the checklist, then click "Mark Challenge Complete".'
    : "No challenge selected yet.";
}

function getOpenTagCount(html, tagName) {
  const opening = html.match(new RegExp(`<${tagName}(\\s|>)`, "gi")) || [];
  const closing = html.match(new RegExp(`</${tagName}>`, "gi")) || [];
  return opening.length - closing.length;
}

function detectIssues(code) {
  const issues = [];

  ["div", "section", "article", "main", "header", "footer", "nav"].forEach((tag) => {
    if (getOpenTagCount(code.html, tag) > 0) {
      issues.push(`Possible unclosed <${tag}> tag.`);
    }
  });

  const cssLines = code.css.split("\n");
  cssLines.forEach((line, index) => {
    const trimmed = line.trim();
    if (
      trimmed.includes(":") &&
      !trimmed.endsWith(";") &&
      !trimmed.endsWith("{") &&
      !trimmed.endsWith("}") &&
      !trimmed.startsWith("@")
    ) {
      issues.push(`CSS line ${index + 1} may be missing a semicolon.`);
    }
  });

  const jsLines = code.js.split("\n");
  jsLines.forEach((line, index) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith("const ") &&
      !trimmed.endsWith(";") &&
      !trimmed.endsWith("{") &&
      !trimmed.includes("=>")
    ) {
      issues.push(`JavaScript line ${index + 1} may need a semicolon.`);
    }
  });

  return issues;
}

function updateIssues() {
  const issues = detectIssues(getCode());
  issueOutput.textContent =
    issues.length === 0
      ? "No obvious beginner issues found. Keep building."
      : issues.join(" ");
}

function explainCode() {
  const code = getCode();
  const htmlSummary = /<form[\s>]/i.test(code.html)
    ? "Your HTML includes a form."
    : /<button[\s>]/i.test(code.html)
      ? "Your HTML includes an interactive button."
      : "Your HTML defines the visible structure of the page.";
  const cssSummary = code.css.trim()
    ? "Your CSS controls colors, spacing, layout, and visual styling."
    : "You do not have CSS yet, so the page is using browser defaults.";
  const jsSummary = code.js.trim()
    ? "Your JavaScript adds behavior or logs information when the page runs."
    : "You do not have JavaScript yet, so the page is static.";

  explainOutput.textContent = `${htmlSummary} ${cssSummary} ${jsSummary}`;
}

function formatHtml(html) {
  return html
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}

function formatCss(css) {
  return css
    .replace(/\{/g, " {\n")
    .replace(/\}/g, "\n}\n")
    .replace(/;/g, ";\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function formatJs(js) {
  return js
    .replace(/;/g, ";\n")
    .replace(/\{/g, " {\n")
    .replace(/\}/g, "\n}\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function formatCurrentTab() {
  const editor = editors[activeTab];
  const value = editor.getValue();

  if (activeTab === "html") {
    editor.setValue(formatHtml(value));
  }

  if (activeTab === "css") {
    editor.setValue(formatCss(value));
  }

  if (activeTab === "js") {
    editor.setValue(formatJs(value));
  }

  queueAutosave();
}

function switchTab(tab) {
  activeTab = tab;

  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });

  editorPanes.forEach((pane) => {
    pane.classList.toggle("active", pane.dataset.pane === tab);
  });

  editors[tab].refresh();
}

function copyCurrentTab() {
  const text = editors[activeTab].getValue();

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(
      () => {
        saveStatus.textContent = "Current tab copied";
      },
      () => {
        saveStatus.textContent = "Copy failed";
      }
    );
    return;
  }

  saveStatus.textContent = "Clipboard unavailable";
}

function downloadProject() {
  const code = getCode();
  const blob = new Blob([wrapDocument(code)], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "html-atlas-playground.html";
  link.click();
  URL.revokeObjectURL(url);
}

function tryExpandShortcut(editor) {
  if (!hasCodeMirror) {
    return false;
  }

  if (activeTab !== "html") {
    return false;
  }

  const cursor = editor.getCursor();
  const line = editor.getLine(cursor.line);
  const beforeCursor = line.slice(0, cursor.ch).trim();

  if (beforeCursor === "!") {
    editor.replaceRange(
      `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    
  </body>
</html>`,
      { line: cursor.line, ch: 0 },
      { line: cursor.line, ch: line.length }
    );
    return true;
  }

  if (beforeCursor === "ul>li*3") {
    editor.replaceRange(
      `<ul>
  <li></li>
  <li></li>
  <li></li>
</ul>`,
      { line: cursor.line, ch: 0 },
      { line: cursor.line, ch: line.length }
    );
    return true;
  }

  return false;
}

function applySnippet(snippetKey) {
  const snippet = snippets[snippetKey];
  editors.html.replaceSelection(`\n${snippet}`);
  switchTab("html");
}

function setDevice(device) {
  previewStage.className = `preview-stage is-${device}`;
  deviceButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.device === device);
  });
}

function markChallengeComplete() {
  const challenge = challenges.find((item) => item.id === challengeSelect.value);
  const code = getCode();

  if (!challenge) {
    return;
  }

  if (!challenge.check(code)) {
    challengeHint.textContent =
      "Not quite yet. Compare your code with the challenge goal and try again.";
    goalStatus.textContent =
      "This challenge is not complete yet. Use the checklist above and compare it with your code.";
    return;
  }

  if (!progress.completedChallenges.includes(challenge.id)) {
    progress.completedChallenges.push(challenge.id);
    progress.xp += 25;
    saveProgress();
    renderTemplateOptions();
    updateStats();
  }

  challengeHint.textContent =
    "Challenge complete. You earned 25 XP and your progress has been updated.";
  goalStatus.textContent =
    "Challenge complete. You earned 25 XP and unlocked more progress.";
}

function handlePreviewMessages(event) {
  if (!event.data || event.data.source !== "html-atlas-playground") {
    return;
  }

  const label = event.data.type === "error" ? "Error" : "Log";
  consoleOutput.textContent = `${label}: ${event.data.payload}`;
}

function bindEvents() {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchTab(button.dataset.tab);
    });
  });

  deviceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setDevice(button.dataset.device);
    });
  });

  snippetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applySnippet(button.dataset.snippet);
    });
  });

  templateSelect.addEventListener("change", () => loadTemplate(templateSelect.value));
  challengeSelect.addEventListener("change", updateChallengeHint);
  editorThemeSelect.addEventListener("change", () => {
    setEditorTheme(editorThemeSelect.value);
    queueAutosave();
  });
  runButton.addEventListener("click", runPreview);
  resetButton.addEventListener("click", () => loadTemplate(templateSelect.value));
  copyButton.addEventListener("click", copyCurrentTab);
  downloadButton.addEventListener("click", downloadProject);
  undoButton.addEventListener("click", () => editors[activeTab].undo());
  redoButton.addEventListener("click", () => editors[activeTab].redo());
  formatButton.addEventListener("click", formatCurrentTab);
  explainButton.addEventListener("click", explainCode);
  completeChallengeButton.addEventListener("click", markChallengeComplete);
  window.addEventListener("message", handlePreviewMessages);

  document.addEventListener("html-atlas-theme-change", () => {
    saveStatus.textContent = "Theme updated";
  });
}

renderTemplateOptions();
renderChallenges();
updateStats();
createEditors();
bindEvents();
loadSavedWorkspace();
renderHistory();
updateIssues();
switchTab("html");
setDevice("desktop");
explainCode();
