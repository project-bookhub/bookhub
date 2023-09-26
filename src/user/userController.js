const userService = require("./userService")

exports.getSignUp = (req, res) => {
    res.render("signup")
}
exports.postSignUp = async (req, res, next) => {
    try {
        const data = req.body;
        await userService.postSignUp(data);
    } catch (e) {
        next(e);
    }
}
