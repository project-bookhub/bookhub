const userService = require("./userService");
const dataCheck = require("../lib/dataCheck");

exports.getLogin = (req, res) => {
  res.render("user/login.html");
};

exports.postLogin = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userPw = req.body.userPw;

    const result = await userService.postLogin(userId, userPw);

    if (!result.isLogin) return res.redirect("/");

    res.cookie(
      "authorization",
      result.data,
      (maxAge = 60 * 10),
      (domain = "127.0.0.1"),
      (path = "/"),
    );
    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getSignUp = (req, res) => {
  res.render("user/signup.html");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const userPw = req.body.userPw;
    const userNickname = req.body.userNickname;

    await userService.postSignUp(userId, userPw, userNickname);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getReset = (req, res) => {
  res.render("user/reset.html");
};

exports.postReset = async (req, res, next) => {
  try {
    const userNickname = req.body.userNickname;
    const userId = req.body.userId;
    const targetPw = req.body.targetPw;

    const result = await userService.postReset(userNickname, userId, targetPw);

    if (result === 0) {
      res.render("index.html", {
        result: false,
      });
    }

    res.render("index.html", {
      result: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.getAuth = (req, res) => {
  res.render("user/auth.html", {
    user_id: req.user ? req.user.user_id : undefined,
  });
};
exports.postAuth = async (req, res, next) => {
  try {
    const userId = req.user.user_id;
    const userPw = req.body.userPw;
    const isDataCheck = dataCheck.checkNullUndefinedSpace([userId, userPw]);
    if (!isDataCheck) throw new Error(4005);

    const result = await userService.postAuth(userId, userPw);

    if (!result) return res.redirect("/users/auth");

    res.render("user/info.html");
  } catch (e) {
    next(e);
  }
};

exports.postInfo = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const targetPw = req.body.targetPw;

    const result = await userService.postInfo(userId, targetPw);

    if (result === 0) {
      res.render("index.html", {
        result: false,
      });
    }

    res.render("index.html", {
      result: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.getExit = async (req, res, next) => {
  try {
    const userId = req.user.user_uid;
    const result = await userService.getExit(userId);

    if (result === 0) {
      res.render("index.html", {
        result: false,
      });
    }

    res.render("index.html", {
      result: true,
    });
  } catch (e) {
    next(e);
  }
};
