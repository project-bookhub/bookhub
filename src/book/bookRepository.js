const pool = require("../../pool");

exports.findAllBook = async () => {
  try {
    const sql1 =
      "SELECT book.*, " +
      "user_id AS book_writer, " +
      "MIN(toc_uid) AS first_toc_uid " +
      "FROM book " +
      "JOIN user ON book_writer = user_uid " +
      "JOIN toc ON book_uid = toc_book " +
      "GROUP BY book_uid " +
      "ORDER BY book_likes DESC " +
      "LIMIT 7;";

    const [orderByLikes] = await pool.query(sql1);

    const sql2 =
      "SELECT book.*, " +
      "user_id AS book_writer, " +
      "MIN(toc_uid) AS first_toc_uid " +
      "FROM book " +
      "JOIN user ON book_writer = user_uid " +
      "JOIN toc ON book_uid = toc_book " +
      "GROUP BY book_uid " +
      "ORDER BY book_created_at DESC " +
      "LIMIT 6;";
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
        "SELECT book.*, " +
        "user_id AS book_writer, " +
        "category_name AS book_category, " +
        "MIN(toc_uid) AS first_toc_uid " +
        "FROM book " +
        "JOIN user ON book_writer = user_uid " +
        "JOIN category ON book_category = category_uid " +
        "JOIN toc ON book_uid = toc_book " +
        "GROUP BY book_uid " +
        "ORDER BY book_created_at DESC " +
        `LIMIT ${start}, ${pageSize};`;

      const [result] = await pool.query(sql);
      return result;
    } else {
      const sql =
        "SELECT book.*, " +
        "user_id AS book_writer, " +
        "category_name AS book_category, " +
        "MIN(toc_uid) AS first_toc_uid " +
        "FROM book " +
        "JOIN user ON book_writer = user_uid " +
        "JOIN category ON book_category = category_uid " +
        "JOIN toc ON book_uid = toc_book " +
        "WHERE category_name = ? " +
        "GROUP BY book_uid " +
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
      "SELECT category.category_name, COUNT(book.book_category) as category_count " +
      "FROM category " +
      "LEFT JOIN book ON category.category_uid = book.book_category " +
      "GROUP BY category.category_uid, category.category_name " +
      "HAVING category_count >= 1 " +
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

exports.deleteByIdAndWriter = async (bookId, bookWriter) => {
  let connection;
  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    // 해당 책의 목차 정보 삭제
    const deleteTOCsSQL = "DELETE FROM toc WHERE toc_book = ?";
    await connection.query(deleteTOCsSQL, [bookId]);

    // 해당 책 정보 삭제
    const deleteBooksSQL =
      "DELETE FROM book WHERE book_uid = ? AND book_writer = ?;";
    const [result] = await connection.query(deleteBooksSQL, [
      bookId,
      bookWriter,
    ]);

    // bookId or bookWriter 다름
    if (result.affectedRows === 0) throw new Error(4005);

    await connection.commit();
    return true;
  } catch (e) {
    await connection.rollback();

    throw e;
  } finally {
    connection.release();
  }
};

exports.insertCategory = async (category) => {
  try {
    /**
     * category 테이블에 category_name이 없는 경우에만 INSERT 한다.
     */
    const sql =
      "INSERT INTO category (category_name) " +
      "SELECT ? WHERE NOT EXISTS (SELECT 1 FROM category WHERE category_name = ?);";

    const [result] = await pool.query(sql, [category, category]);

    return result.affectedRows;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.insertBook = async (
  userId,
  bookTitle,
  bookCategory,
  bookToc,
  bookSummary,
  bookImage,
) => {
  try {
    /**
     * 서브 쿼리 사용
     */
    const sql =
      "INSERT INTO book (book_writer, book_category, book_title, book_toc, book_summary, book_image) " +
      "SELECT " +
      "(SELECT user_uid FROM user WHERE user_id = ?) AS book_writer, " +
      "(SELECT category_uid FROM category WHERE category_name = ?) AS book_category, " +
      "?, ?, ?, ?;";

    const [result] = await pool.query(sql, [
      userId,
      bookCategory,
      bookTitle,
      bookToc,
      bookSummary,
      bookImage,
    ]);

    return result.insertId;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.insertToc = async (createdBookInsertId, tocArr) => {
  try {
    const placeholders = tocArr.map(() => "(?, ?)").join(", ");

    const values = [];
    tocArr.forEach((tocTitle) => {
      values.push(createdBookInsertId, tocTitle);
    });

    const sql = `INSERT INTO toc(toc_book, toc_title)
                     VALUES ${placeholders}`;

    const [result] = await pool.query(sql, values);

    return result.affectedRows;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findBookAndToc = async (bookId) => {
  try {
    const sql =
      "SELECT book_uid, user_id AS book_writer, " +
      "category_name AS book_category, book_title, toc_title AS book_toc, book_summary, " +
      "toc_uid " +
      "FROM book " +
      "JOIN toc ON toc_book = book_uid " +
      "JOIN user ON user_uid = book_writer " +
      "JOIN category ON category_uid = book_category " +
      "WHERE book_uid = ?";

    const [result] = await pool.query(sql, [bookId]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findBookById = async (bookId) => {
  try {
    const sql =
      "SELECT book_uid, user_id AS book_writer, " +
      "category_name AS book_category, book_title, book_toc, book_summary " +
      "FROM book " +
      "JOIN user ON user_uid = book_writer " +
      "JOIN category ON category_uid = book_category " +
      "WHERE book_uid = ?";

    const [[result]] = await pool.query(sql, [bookId]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.updateBookAndToc = async (bookId, bookToc, bookSummary) => {
  try {
    const sql =
      "UPDATE book SET book_toc = ?, book_summary = ? WHERE book_uid = ?";

    await pool.query(sql, [bookToc, bookSummary, bookId]);
  } catch (e) {
    throw new Error(5000);
  }
};

exports.deleteTocById = async (bookId) => {
  try {
    const sql = "DELETE FROM toc WHERE toc_book = ?";
    const [result] = await pool.query(sql, [bookId]);

    return result.affectedRows;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findPageByBookId = async (bookId, tocId) => {
  try {
    const sql =
      "SELECT book.book_uid, book.book_title, toc.toc_uid, toc.toc_title, toc.toc_content FROM book JOIN toc ON toc_book = book_uid WHERE book_uid = ? AND toc_uid = ?";

    const [[result]] = await pool.query(sql, [bookId, tocId]);

    return result;
  } catch (e) {
    throw Error(5000);
  }
};

exports.updatePage = async (bookId, tocId, tocContent) => {
  try {
    const sql =
      "UPDATE toc SET toc_content = ? WHERE toc_uid = ? AND toc_book = ?";

    const [result] = await pool.query(sql, [tocContent, tocId, bookId]);

    return result.affectedRows;
  } catch (e) {
    throw Error(5000);
  }
};

exports.findBookByBookTitleOrderByPage = async (
  bookSearch,
  start,
  pageSize,
) => {
  try {
    const sql =
      "SELECT book_uid, user_nickname AS book_writer," +
      "category_name AS book_category, book_title, book_toc, book_views, book_likes," +
      "book_created_at, book_summary, MIN(toc_uid) AS first_toc_uid FROM book " +
      "JOIN user ON user_uid = book_writer " +
      "JOIN category ON category_uid = book_category " +
      "JOIN toc ON book_uid = toc_book " +
      "WHERE book_title LIKE ? " +
      "GROUP BY book_uid " +
      "LIMIT ?, ?;";

    const [result] = await pool.query(sql, [
      "%" + bookSearch + "%",
      start,
      pageSize,
    ]);

    return result;
  } catch (e) {
    throw Error(5000);
  }
};

exports.countAllBook = async () => {
  try {
    const sql = "SELECT COUNT(*) FROM book";

    const [[result]] = await pool.query(sql);

    return result["COUNT(*)"];
  } catch (e) {
    throw Error(5000);
  }
};

exports.countAllBookByCategory = async (category) => {
  try {
    const sql =
      "SELECT COUNT(*) FROM book JOIN category ON category_uid = book_category WHERE category_name = ?";

    const [[result]] = await pool.query(sql, [category]);

    return result["COUNT(*)"];
  } catch (e) {
    throw Error(5000);
  }
};

exports.countAllSearchBook = async (bookSearch) => {
  try {
    const sql = "SELECT COUNT(*) FROM book WHERE book_title LIKE ?";

    const [[result]] = await pool.query(sql, ["%" + bookSearch + "%"]);

    return result["COUNT(*)"];
  } catch (e) {
    throw Error(5000);
  }
};

exports.countAllBookByWriter = async (userId) => {
  try {
    const sql = "SELECT COUNT(*) FROM book WHERE book_writer = ?";

    const [[result]] = await pool.query(sql, [userId]);

    return result["COUNT(*)"];
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findBookByUserId = async (bookId) => {
  try {
    const sql =
      "SELECT book_title, user_id AS book_writer FROM book JOIN user ON user_uid = book_writer WHERE book_uid = ?";

    const [[result]] = await pool.query(sql, [bookId]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};
