const util = require("util");
const mysql = require("mysql");

let pool = mysql.createPool({
    host: "65.19.141.67",
    user: "aditikum_aditikumari",
    password: "Aditi@1999",
    database: "aditikum_meme",

});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to Database");
    }
    if (connection) connection.release();
    return;
});

pool.query = util.promisify(pool.query);
module.exports = pool;