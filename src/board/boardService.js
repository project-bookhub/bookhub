const boardRepository = require("./boardRepository");

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
