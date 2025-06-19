const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // MySQL parolingiz
    database: "startup_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL bazaga ulandi...");
});

module.exports = db;
