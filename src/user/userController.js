const userService = require("./userService");

exports.getLogin = (req, res) => {
  res.render("user/login.html");
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
  res.render("user/signup.html");
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
  res.render("reset.html");
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

exports.getAuth = (req, res) => {
  res.render("user/auth.html");
};
exports.postAuth = async (req, res, next) => {
  try {
    const data = req.body;

    const result = await userService.postAuth(data);

    if (!result) res.redirect("/users/auth");

    res.render("info.html");
  } catch (e) {
    next(e);
  }
};

exports.postInfo = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await userService.postInfo(data);

    console.log(result);
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
    const data = req.query;
    const result = await userService.getExit(data);

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
