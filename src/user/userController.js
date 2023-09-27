const userService = require("./userService");

exports.getLogin = (req, res) => {
  res.render("login.html");
};

exports.postLogin = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.postLogin(data);

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
  res.render("signup.html");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const data = req.body;

    await userService.postSignUp(data);

    res.redirect("/");
  } catch (e) {
    next(e);
  }
};

exports.getReset = (req, res) => {
  res.render("auth.html");
};

exports.postReset = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.postReset(data);

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

exports.getAuth = () => {};
exports.postAuth = () => {};
exports.getInfo = () => {};
exports.postInfo = () => {};
exports.getExit = () => {};
