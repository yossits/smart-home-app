const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

// הגדרת הסוד של ה-JWT
const JWT_SECRET = "your_jwt_secret"; // שים סוד חזק כאן, ועדיף להשתמש ב .env

const app = express();
app.use(bodyParser.json());
app.use(cors());

// סימולציה של בסיס נתונים זמני בזיכרון
const users = [];

// מסלול לרישום משתמשים (Sign up)
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;

  // בדיקה אם המשתמש כבר קיים
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // הצפנת הסיסמא
  const hashedPassword = bcrypt.hashSync(password, 8);

  // הוספת המשתמש למערך
  users.push({ email, password: hashedPassword });

  res.json({ message: "User registered successfully" });
});

// מסלול להתחברות (Login)
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // בדיקה אם המשתמש קיים
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // השוואת הסיסמא המוצפנת
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // יצירת JWT Token
  const token = jwt.sign({ email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Middleware לאימות טוקן
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // מקבל את ה-Token מה-Headers
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // אימות הטוקן
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user; // שמירת המידע של המשתמש בבקשה
    next(); // ממשיכים למסלול הבא
  });
};

// מסלול להתנתקות (Logout)
app.post("/api/logout", authenticateToken, (req, res) => {
  // כאן אתה יכול להוסיף לוגיקה נוספת (כגון ניהול טוקנים בצד השרת) אם נדרש
  res.json({ message: "Logged out successfully" });
});

// מסלול מוגן לדוגמה שדורש אימות
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}!` });
});

// הגדרת השרת לפורט 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
