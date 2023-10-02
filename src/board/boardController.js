const boardService = require("./boardService");

exports.getBoard = async (req, res, next) => {
  try {
    const page = req.query.page;

    const result = await boardService.getBoard(page);

    res.render("board/index.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      result: result[1],
      pagination: result[0],
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

exports.getBoardModify = async (req, res, next) => {
  try {
    const boardId = req.query.boardId;
    const result = await boardService.getBoardModify(boardId);

    res.render("board/modify.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      ...result,
    });
  } catch (e) {
    next(e);
  }
};

exports.postBoardModify = async (req, res, next) => {
  try {
    // 관리자 권한 체크
    const userId = req.user.user_id;

    const boardId = req.query.boardId;
    const boardTitle = req.body.boardTitle;
    const boardContent = req.body.boardContent;

    await boardService.postBoardModify(
      boardId,
      boardTitle,
      boardContent,
      userId,
    );

    res.redirect(`/boards/view?boardId=${boardId}`);
  } catch (e) {
    next(e);
  }
};

exports.getBoardView = async (req, res, next) => {
  try {
    const boardId = req.query.boardId;

    const result = await boardService.getBoardView(boardId);

    res.render("board/view.html", {
      user_nickname: req.user ? req.user.user_nickname : undefined,
      ...result,
    });
  } catch (e) {
    next(e);
  }
};
