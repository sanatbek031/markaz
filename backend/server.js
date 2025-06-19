const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

app.use(cors({ origin: "http://localhost:5500", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("✅ Server 5000-portda ishga tushdi"));
