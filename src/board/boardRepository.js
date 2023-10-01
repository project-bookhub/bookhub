const pool = require("../../pool");

exports.findAllBoardOrderByPage = async (start, pageSize) => {
  try {
    const sql =
      "SELECT * FROM board ORDER BY board_created_at DESC LIMIT ?, ?;";

    const [result] = await pool.query(sql, [start, pageSize]);

    return result;
  } catch (e) {
    console.log(e.message);
    throw new Error(5000);
  }
};
