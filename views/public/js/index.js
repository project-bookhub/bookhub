function searchAction() {
  const inputValue = document.getElementById("search-input").value;
  const newAction = "/books/search?bookSearch=" + inputValue + "&page=1";

  location.href = newAction;
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchAction();
  });
