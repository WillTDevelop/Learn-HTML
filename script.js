const quizForm = document.querySelector("#quiz-form");
const quizQuestionsContainer = document.querySelector("#quiz-questions");
const quizSummary = document.querySelector("#quiz-summary");
const resetQuizButton = document.querySelector("#reset-quiz");

const quizQuestions = [
  {
    question: "1. What is HTML mainly used for on a web page?",
    name: "q1",
    answer: "structure",
    explanation:
      "HTML gives a page structure and meaning. CSS styles the page and JavaScript adds behavior.",
    wrong: {
      color:
        "That answer describes CSS more than HTML. HTML organizes content rather than styling it.",
      behavior:
        "That answer describes JavaScript. HTML lays out the content that scripts can later enhance."
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
      "The <body> contains the content visitors see on the page. The <head> stores metadata and linked resources.",
    wrong: {
      head:
        "The <head> is for metadata, not visible page content. The page anatomy lesson explains this directly.",
      title:
        "The <title> sets the browser tab text, but the visible page belongs inside the <body>."
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
      "Attributes add extra information to an element, such as href on links or src on images.",
    wrong: {
      close:
        "Closing tags finish an element, but attributes provide details about the element instead.",
      "style-only":
        "Attributes are not only for styling. They can define ids, destinations, sources, types, and more."
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
      "An <h1> is the top-level heading and usually represents the main title of the page.",
    wrong: {
      p:
        "A <p> is a paragraph. Headings should use <h1> through <h6> so the structure stays clear.",
      div:
        "A <div> is a generic container. It does not carry heading meaning the way <h1> does."
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
      "The <a> tag creates links and usually uses an href attribute to point to a destination.",
    wrong: {
      img:
        "An <img> displays an image. It does not create a hyperlink by itself.",
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
      "Semantic HTML gives content clearer meaning, which helps both maintainability and accessibility.",
    wrong: {
      shorter:
        "Semantic HTML is not mainly about writing less code. It is about choosing elements that match the content's role.",
      animation:
        "Animations come from CSS or JavaScript. Semantic HTML helps define structure and meaning."
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
      "The <nav> element is used for important navigation links on the page.",
    wrong: {
      footer:
        "A <footer> holds closing or supporting content, not the main navigation area.",
      article:
        "An <article> is for standalone content such as a post or story, not navigation."
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
      "A <label> tells users what an input is for and improves accessibility.",
    wrong: {
      button:
        "A <button> triggers an action, but it does not describe a form field.",
      section:
        "A <section> groups content, but it does not label a form control."
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
        "The <html> tag starts the document, but it does not replace the <!DOCTYPE html> declaration.",
      meta:
        "A <meta> tag defines metadata, but it does not set the document mode like <!DOCTYPE html> does."
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
        "A <main> has a specific role: it marks the page's primary content. It is not a generic wrapper.",
      h2:
        "An <h2> is a heading tag, not a generic container."
    },
    options: [
      { value: "main", label: "<main>" },
      { value: "div", label: "<div>" },
      { value: "h2", label: "<h2>" }
    ]
  }
];

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
        <article class="quiz-card">
          <h3>${escapeHtml(item.question)}</h3>
          <div class="quiz-options">${options}</div>
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

renderQuiz();
resetQuiz();

quizForm.addEventListener("submit", evaluateQuiz);
resetQuizButton.addEventListener("click", resetQuiz);
