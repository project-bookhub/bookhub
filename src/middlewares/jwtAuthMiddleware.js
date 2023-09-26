const JWT = require("../lib/jwt")
const jwt = new JWT();
const userService = require("../user/userService")
require("dotenv").config()

exports.auth = async (req, res, next) => {
    try {
        const {authorization} = req.cookies;

        if(!Authorization) return next();

        const payload = jwt.verify(authorization, process.env["secret-key"])
        const user = await userService.findOneByUserId(payload.userId)

        req.user = user;
        next()

    }catch(e){

        next(e)
    }
}