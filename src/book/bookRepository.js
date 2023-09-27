const pool = require("../../pool");

exports.findAllBook = async () => {
  try {
    const sql1 =
      "SELECT book.*, user.user_id AS book_writer " +
      "FROM book JOIN user ON book.book_writer = user.user_uid ORDER BY book_likes DESC;";

    const [orderByLikes] = await pool.query(sql1);

    const sql2 =
      "SELECT book.*, user.user_id AS book_writer " +
      "FROM book JOIN user ON book.book_writer = user.user_uid ORDER BY book_created_at DESC;";
    const [orderByDate] = await pool.query(sql2);

    const result = [orderByLikes, orderByDate];

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};
