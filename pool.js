const mysql2 = require("mysql2/promise");
require("dotenv").config()
const pool = mysql2.createPool({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});

module.exports = pool;
