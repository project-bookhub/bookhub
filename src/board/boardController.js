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

exports.getBoardWrite = (req, res, next) => {
  try {
    res.render("board/write.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
    });
  } catch (e) {
    next(e);
  }
};

exports.postBoardWrite = async (req, res, next) => {
  try {
    const boardTitle = req.body.boardTitle;
    const boardContent = req.body.boardContent;
    const boardWriter = req.user.user_uid;

    const insertedId = await boardService.postBoardWrite(
      boardTitle,
      boardContent,
      boardWriter,
    );

    res.redirect(`/boards/view?boardId=${insertedId}`);
  } catch (e) {
    next(e);
  }
};
