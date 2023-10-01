const boardService = require("./boardService");

exports.getBoard = async (req, res, next) => {
  try {
    const page = req.query.page;

    const result = await boardService.getBoard(page);

    res.render("board/index.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      result,
    });
  } catch (e) {
    next(e);
  }
};
