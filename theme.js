(function () {
  const storageKey = "html-atlas-theme";
  let canStore = true;

  function setStoredTheme(theme) {
    if (!canStore) {
      return;
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      canStore = false;
    }
  }

  function getStoredTheme() {
    if (!canStore) {
      return "light";
    }

    try {
      return localStorage.getItem(storageKey) || "light";
    } catch (error) {
      canStore = false;
      return "light";
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    setStoredTheme(theme);

    document.querySelectorAll("[data-theme-label]").forEach((label) => {
      label.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    document.dispatchEvent(
      new CustomEvent("html-atlas-theme-change", { detail: { theme: next } })
    );
  }

  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", toggleTheme);
    });
  });
})();
