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
    const bookListResult = await bookRepository.findBookOrderByPage(
      page,
      category,
    );

    const categoryCountResult = await bookRepository.getCategoryCount();

    const result = [bookListResult, categoryCountResult];

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
