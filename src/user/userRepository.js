const pool = require("../../pool")

exports.insertOneByUserInfo = async (userId, userPw, userNickname) => {

    try {
        const sql = "INSERT INTO user(user_id, user_pw, user_nickname, user_role) VALUES (?, ?, ?, ?)"

        const [result] = await pool.query(sql, [userId, userPw, userNickname, 1])

        return result
    } catch (e) {
        throw new Error(4444)
    }
}