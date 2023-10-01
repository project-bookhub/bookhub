const pool = require("../../pool");

exports.findAllBoardOrderByPage = async (start, pageSize) => {
  try {
    const sql =
      "SELECT board_uid, user_nickname AS board_writer, board_title, board_content, board_views, board_created_at FROM board JOIN user ON user_uid = board_writer " +
      "ORDER BY board_created_at DESC LIMIT ?, ?;";

    const [result] = await pool.query(sql, [start, pageSize]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.insertBoard = async (boardTitle, boardContent, boardWriter) => {
  try {
    const sql =
      "INSERT INTO board(board_writer, board_title, board_content) " +
      "VALUES(?, ?, ?)";

    const [result] = await pool.query(sql, [
      boardWriter,
      boardTitle,
      boardContent,
    ]);

    return result.insertId;
  } catch (e) {
    throw new Error(5000);
  }
};
