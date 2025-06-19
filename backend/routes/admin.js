const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "startup_secret";

// Middleware: faqat token bor foydalanuvchi kiradi
function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token noto‘g‘ri" });
    }
}

// Admin sahifasi uchun ma'lumot
router.get("/panel", authMiddleware, (req, res) => {
    res.json({ message: `Xush kelibsiz, foydalanuvchi ID: ${req.user.id}` });
});

module.exports = router;
