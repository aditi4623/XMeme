"use strict";
var pool = require("./database_configuration");

module.exports.ADD_MEME = async(req, res, next) => {
    
    try {
        var name = req.body.name;
        var text = req.body.text;
        var url = req.body.url;
        if (name && text && url) {
            let sql = `INSERT INTO meme(name,text, url) VALUES (?,?,?)`;
            await pool.query(sql,[name,text,url]);
            res.status(200).json({
                message: "Saved",
                status: 1,
            });
        } else {
            res.status(200).json({
                message: "Missing req.",
                status: 0,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: 0,
            message: err.message,
        });
    }
};

module.exports.GET_MEME = async(req, res, next) => {
    try {    
            let sql = "SELECT * FROM meme ORDER BY id DESC LIMIT 100";
            var result = await pool.query(sql);

        res.status(200).json({
            message: "Data Fetched",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            errMessage: err.message,
        });
    }
};
module.exports.DELETE_MEME = async(req, res, next) => {
    try {
        var id = req.body.id;
        if (id) {
            let sql = `DELETE FROM meme WHERE id=${id}`;
            await pool.query(sql);
            res.status(200).json({
                message: "Deleted",
                status: 1,
            });
        } else {
            res.status(200).json({
                message: "Missing req.",
                status: 0,
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            status: 0,
            message: err.message,
        });
    }
};