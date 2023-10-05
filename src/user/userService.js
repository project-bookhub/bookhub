const userRepository = require("./userRepository");
const Crypto = require("crypto");
const JWT = require("../lib/jwt");
const { findOneByUserNicknameAndUserId } = require("./userRepository");
const { getExit } = require("./userController");
const jwt = new JWT();
const bookRepository = require("../book/bookRepository");

exports.postLogin = async (userId, userPw) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(userPw)
      .digest("base64");

    const result = await userRepository.findOneByUserIdAndUserPassword(
      userId,
      hashedUserPw,
    );
    if (!result) return { isLogin: false, data: null };

    const token = jwt.sign({ userId: result["user_id"] });

    return { isLogin: true, data: token };
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postSignUp = async (userId, userPw, userNickname) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(userPw)
      .digest("base64");

    const userDuplicationCheck = await userRepository.findOne(
      "user_id",
      userId,
    );

    if (userDuplicationCheck) throw new Error(4007);

    await userRepository.insertOneByUserInfo(
      userId,
      hashedUserPw,
      userNickname,
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.findOneByUserId = async (userId) => {
  try {
    const result = await userRepository.findOne("user_id", userId);
    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postReset = async (userNickname, userId, targetPw) => {
  try {
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

exports.postAuth = async (userUid, userId, userPw) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(userPw)
      .digest("base64");

    const result = await userRepository.findOneByUserIdAndUserPassword(
      userId,
      hashedUserPw,
    );
    if (!result) throw new Error(4020);

    const bookWriterCount = await bookRepository.countAllBookByWriter(userUid);

    return bookWriterCount;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.postInfo = async (userNickname, userPw, userId) => {
  try {
    const hashedUserPw = Crypto.createHash("sha512")
      .update(userPw)
      .digest("base64");

    const result = await userRepository.updateUserPasswordByUserNickname(
      hashedUserPw,
      userNickname,
      userId,
    );

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};

exports.getExit = async (userId) => {
  try {
    // 사용자 정보 삭제
    const result = await userRepository.deleteUserByUserId(userId);

    return result;
  } catch (e) {
    throw new Error(e.message);
  }
};
