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

exports.fineOne = async (field, value) => {
  try {
    const sql = `SELECT *
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
