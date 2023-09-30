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

    res.render("book/list.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      bookListOrderByPage: result[0],
      bookCategoryCount: result[1],
    });
  } catch (e) {
    next(e);
  }
};

exports.getBookView = async (req, res, next) => {
  try {
    const bookId = req.query.bookId;
    const tocId = req.query.tocId;

    const result = await bookService.getBookView(bookId, tocId);

    res.render("book/view.html", {
      tocList: result[0],
      tocContent: result[1],
    });
  } catch (e) {
    next(e);
  }
};

exports.getBookDelete = async (req, res, next) => {
  try {
    const bookId = req.query.bookId;
    const bookWriter = req.user.user_id;

    const result = await bookService.getBookDelete(bookId, bookWriter);

    if (result === 0) {
      res.render("index.html", {
        result: false,
      });
    }

    res.render("index.html", {
      result: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.getBookTocWrite = (req, res, next) => {
  try {
    res.render("book/toc/write.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
    });
  } catch (e) {
    next(e);
  }
};

/**
 * 1. category 없다면 생성.
 * 2. book row 생성
 * 3. 목차 입력에 따른 toc 생성
 */
exports.postBookTocWrite = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const bookTitle = req.body.bookTitle;
    const bookCategory = req.body.bookCategory;
    const bookToc = req.body.bookToc;
    const bookSummary = req.body.bookSummary;

    const createdBookInsertId = await bookService.postBookTocWrite(
      userId,
      bookTitle,
      bookCategory,
      bookToc,
      bookSummary,
    );

    res.redirect(`/books/toc/view?bookId=${createdBookInsertId}`);
  } catch (e) {
    next(e);
  }
};
