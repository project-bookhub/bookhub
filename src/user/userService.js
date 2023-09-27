const userRepository = require("./userRepository");
const Crypto = require("crypto");
const JWT = require("../lib/jwt");
const { findOneByUserNicknameAndUserId } = require("./userRepository");
const jwt = new JWT();

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

exports.postReset = async (data) => {
  try {
    const userNickname = data.userNickname;
    const userId = data.userId;
    const targetPw = data.targetPw;
    const hashedUserPw = Crypto.createHash("sha512")
      .update(targetPw)
      .digest("base64");

    const result =
      await userRepository.updateUserPasswordByUserIdAndUserNickname(
        hashedUserPw,
        userId,
        userNickname,
      );

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postAuth = async (data) => {
  try {
    const userId = data.userId;
    const userPw = data.userPw;

    const hashedUserPw = Crypto.createHash("sha512")
      .update(userPw)
      .digest("base64");

    const result = await userRepository.findOneByUserIdAndUserPassword(
      userId,
      hashedUserPw,
    );

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postInfo = async (data) => {
  try {
    const userId = data.userId;
    const targetPw = data.targetPw;
    const hashedUserPw = Crypto.createHash("sha512")
      .update(targetPw)
      .digest("base64");

    const result = await userRepository.updateUserPasswordByUserId(
      hashedUserPw,
      userId,
    );

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
