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

    const categoryCountResult = await bookRepository.getCategoryCount();

    const result = [bookListResult, categoryCountResult];

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
