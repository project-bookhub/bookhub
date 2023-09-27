const pool = require("../../pool");

exports.findAllBook = async () => {
  try {
    const sql1 = "SELECT * FROM book ORDER BY book_likes DESC";
    const [orderByLikes] = await pool.query(sql1);
    const sql2 = "SELECT * FROM book ORDER BY book_created_at DESC";
    const [orderByDate] = await pool.query(sql2);

    const result = [orderByLikes, orderByDate];

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};
