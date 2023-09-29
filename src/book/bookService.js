const bookRepository = require("./bookRepository");

exports.getBookList = async () => {
  try {
    const result = await bookRepository.findAllBook();

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookListAndCategoryCount = async (page, category) => {
  try {
    let start = 0;
    const pageSize = 5;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }

    const bookListResult = await bookRepository.findBookOrderByPage(
      start,
      pageSize,
      category,
    );

    const categoryCountResult = await bookRepository.findCategoryCount();

    const result = [bookListResult, categoryCountResult];

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookView = async (bookId, tocId) => {
  try {
    const tocListResult = await bookRepository.findTocList(bookId);
    const tocContentResult = await bookRepository.findTocContent(tocId);

    const result = [tocListResult, tocContentResult];
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBookDelete = async (bookId, bookWriter) => {
  try {
    const result = await bookRepository.deleteByIdAndWriter(bookId, bookWriter);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
