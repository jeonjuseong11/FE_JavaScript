class DarkModeToggle {
  isDarkMode = null; //상태 추가

  constructor({ $target }) {
    const $wrapper = document.createElement("section");

    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $DarkModeToggle.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", (e) => {
      setColorMode(e.target.checked);
    });
    this.initColorMode();
  }
  initColorMode() {
    //  초기화
    //  isDarkMode state, checkbox 상태, html attr
    this.isDarkMode = window.matchMedia("(prefers-color-schema:dark)").matches;
    this.$DarkModeToggle.checked = this.isDarkMode;
    this.setColorMode(this.isDarkMode);
  }
  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}
