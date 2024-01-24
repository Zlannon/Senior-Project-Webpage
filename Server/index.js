const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('projects.db')

app.get("/search", (req, res) => {

    let sql = `SELECT * FROM projList`

    db.all(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("server running");
});