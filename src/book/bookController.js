const bookService = require("./bookService");

exports.getBookList = async (req, res, next) => {
  try {
    const result = await bookService.getBookList();

    res.render("index.html", {
      user_nickname: req.user.userNickname,
      bookListOrderByLikes: result[0],
      bookListOrderByDate: result[1],
    });
  } catch (e) {
    next(e);
  }
};
