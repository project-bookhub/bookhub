const bookService = require("./bookService");

exports.getBookList = async (req, res, next) => {
  try {
    const result = await bookService.getBookList();

    res.render("index.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      bookListOrderByLikes: result[0],
      bookListOrderByDate: result[1],
    });
  } catch (e) {
    next(e);
  }
};

exports.getBookListAndCategoryCount = async (req, res, next) => {
  try {
    const page = req.query.page;
    const category = req.query.category;

    const result = await bookService.getBookListAndCategoryCount(
      page,
      category,
    );

    res.render("list.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      bookListOrderByPage: result[0],
      bookCategoryCount: result[1],
    });
  } catch (e) {
    next(e);
  }
};
