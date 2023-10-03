const pool = require("../../pool");

exports.insertOneByUserInfo = async (userId, userPw, userNickname) => {
  try {
    const sql =
      "INSERT INTO user(user_id, user_pw, user_nickname, user_role) VALUES (?, ?, ?, ?)";

    const [result] = await pool.query(sql, [userId, userPw, userNickname, 1]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.findOne = async (field, value) => {
  try {
    const sql = `SELECT *, DATE_FORMAT(user_created_at, '%Y-%m-%d') AS user_created_at
                     FROM user
                     WHERE ${field} = ?`;
    const [[result]] = await pool.query(sql, [value]);

    return result;
  } catch (err) {
    throw new Error(5000);
  }
};

exports.findOneByUserIdAndUserPassword = async (userId, userPw) => {
  try {
    const sql = "SELECT * FROM user WHERE user_id=? AND user_pw=?";

    const [[result]] = await pool.query(sql, [userId, userPw]);

    return result;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.updateUserPasswordByUserIdAndUserNickname = async (
  password,
  userId,
  userNickname,
) => {
  try {
    const sql = "UPDATE user SET user_pw=? WHERE user_id=? AND user_nickname=?";

    const [result] = await pool.query(sql, [password, userId, userNickname]);

    return result.affectedRows;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.updateUserPasswordByUserId = async (password, userId) => {
  try {
    const sql = "UPDATE user SET user_pw=? WHERE user_id=?";

    const [result] = await pool.query(sql, [password, userId]);

    return result.affectedRows;
  } catch (e) {
    throw new Error(5000);
  }
};

exports.deleteUserByUserId = async (userId) => {
  let connection;
  try {
    connection = await pool.getConnection();

    await connection.beginTransaction();

    // 사용자가 작성한 목차 정보 삭제
    const deleteTOCsSQL =
      "DELETE FROM toc WHERE toc_book IN (SELECT book_uid FROM book WHERE book_writer=?)";
    await connection.query(deleteTOCsSQL, [userId]);

    // 사용자가 작성한 책 정보 삭제
    const deleteBooksSQL = "DELETE FROM book WHERE book_writer = ?;";
    await connection.query(deleteBooksSQL, [userId]);

    // 사용자가 작성한 게시글 정보 삭제
    const deleteBoardsSQL = "DELETE FROM board WHERE board_writer=?";
    await connection.query(deleteBoardsSQL, [userId]);

    // 사용자 정보 삭제
    const deleteUserSQL = "DELETE FROM user WHERE user_uid=?";
    await connection.query(deleteUserSQL, [userId]);

    await connection.commit();
    return true;
  } catch (e) {
    await connection.rollback();
    return false;
    throw new Error(5000);
  } finally {
    connection.release();
  }
};
