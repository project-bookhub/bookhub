const boardRepository = require("./boardRepository");
const userRepository = require("../user/userRepository");

exports.getBoard = async (page) => {
  try {
    let start = 0;
    const pageSize = 5;

    if (page <= 0) {
      page = 1;
    } else {
      start = (page - 1) * pageSize;
    }

    const result = await boardRepository.findAllBoardOrderByPage(
      start,
      pageSize,
    );

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postBoardWrite = async (boardTitle, boardContent, boardWriter) => {
  try {
    const insertedId = await boardRepository.insertBoard(
      boardTitle,
      boardContent,
      boardWriter,
    );

    if (insertedId === 0) throw new Error(4005);

    return insertedId;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getBoardModify = async (boardId) => {
  try {
    const result = await boardRepository.findBoardById(boardId);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postBoardModify = async (boardId, boardTitle, boardContent, userId) => {
  try {
    const userRole = await userRepository.findUserRole(userId);

    if (userRole < 2) throw new Error(4006);

    const affectedRow = await boardRepository.updateBoardById(
      boardId,
      boardTitle,
      boardContent,
    );

    if (affectedRow === 0) throw new Error(4005);
  } catch (e) {
    throw new Error(e.message);
  }
};
