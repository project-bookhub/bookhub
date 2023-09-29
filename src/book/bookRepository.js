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

exports.findBookOrderByPage = async (start, pageSize, category) => {
  try {
    if (category === undefined) {
      const sql =
        "SELECT " +
        "book.*, " +
        "user.user_id AS book_writer, " +
        "category.category_name AS book_category " +
        "FROM book " +
        "JOIN user ON book.book_writer = user.user_uid " +
        "JOIN category ON book.book_category = category.category_uid " +
        "ORDER BY book_created_at DESC " +
        `LIMIT ${start}, ${pageSize};`;

      const [result] = await pool.query(sql);
      return result;
    } else {
      const sql =
        "SELECT " +
        "book.*, " +
        "user.user_id AS book_writer, " +
        "category.category_name AS book_category " +
        "FROM book " +
        "JOIN user ON book.book_writer = user.user_uid " +
        "JOIN category ON book.book_category = category.category_uid " +
        "WHERE category.category_name = ? " +
        "ORDER BY book_created_at DESC " +
        `LIMIT ${start}, ${pageSize};`;

      const [result] = await pool.query(sql, [category]);
      return result;
    }
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findCategoryCount = async () => {
  try {
    const sql =
      "SELECT category.category_name, COUNT(book.book_category) as category_count\n" +
      "FROM category\n" +
      "LEFT JOIN book ON category.category_uid = book.book_category\n" +
      "GROUP BY category.category_uid, category.category_name\n" +
      "HAVING category_count >= 1\n" +
      "ORDER BY category_count DESC;";

    const [result] = await pool.query(sql);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findTocList = async (bookId) => {
  try {
    const sql = "SELECT * FROM toc WHERE toc_book = ?";
    const [result] = await pool.query(sql, [bookId]);
    return result;
  } catch (e) {
    throw new Error(5000);
  }
};
exports.findTocContent = async (tocId) => {
  try {
    const sql = "SELECT toc_title, toc_content FROM toc WHERE toc_uid = ?";
    const [[result]] = await pool.query(sql, [tocId]);
    return result;
  } catch (e) {
    throw new Error(5000);
  }
};
