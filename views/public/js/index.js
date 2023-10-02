function searchAction() {
  const inputValue = document.getElementById("search-input").value;
  const newAction = "/books/search?bookSearch=" + inputValue + "&page=1";

  location.href = newAction;
}
function pageAction() {
  const inputValue = document.getElementById("page-input").value;
  const newAction = "/books/list?page=" + inputValue;

  location.href = newAction;
}

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    searchAction();
  });
document
  .getElementById("page-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    pageAction();
  });
