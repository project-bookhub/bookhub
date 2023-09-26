const pool = require("../../pool")

exports.insertOneByUserInfo = async (userId, userPw, userNickname) => {

    try {
        const sql = "INSERT INTO user(user_id, user_pw, user_nickname, user_role) VALUES (?, ?, ?, ?)"

        const [result] = await pool.query(sql, [userId, userPw, userNickname, 1])

        return result
    } catch (e) {
        throw new Error(5000)
    }
}

exports.fineOne = async (field, value) => {
    try {
        const sql = `select * from user where ${field}=?`;
        const [[result]] = await pool.query(sql, [value]);
        return result;
    } catch (err) {
        throw new Error(5000);
    }
};
