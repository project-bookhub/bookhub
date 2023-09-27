const userRepository = require("./userRepository");
const Crypto = require("crypto");
const JWT = require("../lib/jwt");
const jwt = new JWT();

exports.postSignUp = async (data) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(data.userPw)
      .digest("base64");

    await userRepository.insertOneByUserInfo(
      data.userId,
      hashedUserPw,
      data.userNickname,
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.findOneByUserId = async (userId) => {
  try {
    const result = await userRepository.fineOne("user_id", userId);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postLogin = async (data) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(data.userPw)
      .digest("base64");

    const result = await userRepository.findOneByUserIdAndUserPassword(
      data.userId,
      hashedUserPw,
    );
    if (!result) return { isLogin: false, data: null };

    const token = jwt.sign({ userId: result["user_id"] });

    return { isLogin: true, data: token };
  } catch (e) {
    throw new Error(e.message);
  }
};
