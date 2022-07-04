document.querySelector("input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector('form').submit()
  }
});