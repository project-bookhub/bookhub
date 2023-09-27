const bookRepository = require("./bookRepository");

exports.getBookList = async () => {
  try {
    const result = await bookRepository.findAllBook();

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
