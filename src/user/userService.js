const userRepository = require("./userRepository")

exports.postSignUp = async (data) => {
    try {
        await userRepository.insertOneByUserInfo(data.userId, data.userPw, data.userNickname)

    } catch (e) {
        throw new Error(e.message)
    }

}