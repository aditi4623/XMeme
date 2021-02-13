require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT=process.env.PORT || 8081
const {ADD_MEME,GET_MEME,DELETE_MEME}=require('./query')

app.post("/", ADD_MEME);
app.get('/', GET_MEME);
app.delete('/',DELETE_MEME);

app.listen(PORT,()=>{
    console.log("server is running at "+ PORT)
})