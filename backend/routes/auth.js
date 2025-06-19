const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const JWT_SECRET = "startup_secret";

// Ro'yxatdan o'tish
router.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        (err, results) => {
            if (err) return res.status(400).json({ message: "Foydalanuvchi mavjud yoki xatolik." });
            res.status(201).json({ message: "Ro'yxatdan o'tish muvaffaqiyatli" });
        }
    );
});

// Kirish
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Server xatosi" });
        if (results.length === 0) return res.status(401).json({ message: "Foydalanuvchi topilmadi" });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Parol noto‘g‘ri" });

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, { httpOnly: true }).json({ message: "Kirish muvaffaqiyatli" });
    });
});

module.exports = router;
