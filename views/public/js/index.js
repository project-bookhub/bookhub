function searchAction() {
  const inputValue = document.getElementById("search-input").value;
  const newAction = "/books/search?bookSearch=" + inputValue + "&page=1";

  location.href = newAction;
}
function bookPageAction() {
  const inputValue = document.getElementById("book-page-input").value;
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
  .getElementById("book-page-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    bookPageAction();
  });
