const userRepository = require("./userRepository")
const Crypto = require("crypto")

exports.postSignUp = async (data) => {
    try {

        const hashedUserPw = Crypto.createHash("sha512")
            .update(data.userPw)
            .digest("base64")


        await userRepository.insertOneByUserInfo(data.userId, hashedUserPw, data.userNickname)

    } catch (e) {
        throw new Error(e.message)
    }

}

exports.findOneByUserId = async (userId) => {
    try {
        const result = await userRepository.fineOne("user_id", userId);
        return result;
    } catch (e) {
        throw new Error(e.message);
    }
};
