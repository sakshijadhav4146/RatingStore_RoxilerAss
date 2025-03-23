const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcryptjs");
const { generateToken, authmiddleware } = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { name, email, password, address, role } = req.body;
  if (!name || !email || !password || !address || !role) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const query = `INSERT INTO users(name,email,password,address,role) VALUE(?,?,?,?,?)`;
  db.query(
    query,
    [name, email, hashedPassword, address, role],
    (err, result) => {
      if (err) {
        return res.status(500).json({ msg: "error registering user" });
      }
      res.status(200).json({ msg: "user added successfully" });
    }
  );
});

router.get("/getUser", (req, res) => {
  const query = `SELECT id,name,email,password,address,role FROM users`;
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Error fetching users" });
    }
    res.status(200).json({ users: result });
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email=?`;
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(query, [email], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    return res.status(200).json({
      msg: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
});

router.put("/updatePassword",authmiddleware, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  if (!currentPassword || !newPassword)
    return res.status(400).json("Name and email are required");
  if (
    newPassword.length < 8 ||
    newPassword.length > 16 ||
    !/[A-Z]/.test(newPassword) ||
    !/[@#$%^&*()_+-=]/.test(newPassword)
  ) {
    return res.json({
      msg: "new password must be between 8-16 character, with at least one uppercase letter",
    });
  }

  const query = `SELECT * FROM users WHERE id=?`;
  db.query(query, [userId], async (err, result) => {
    if (err) {
      return res.status(500).json({ msg: "Error fetching user" });
    }
    const user = result[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid password" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(currentPassword, salt);
    const updatePassword = `UPDATE users SET password = ? WHERE id=?`;
    db.query(updatePassword,[hashedPassword,userId],(err,result)=>{
        if (err) {
            return res.status(500).json({ msg: "Error updating password" });
        }
        res.status(200).json({ msg: "Password updated successfully" }); 
    })
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ msg: "Logout successful" });
});

module.exports = router;
