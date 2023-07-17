const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/loginuser", async (req, res) => {
  try {
    let em = req.body.email;
    let ps = req.body.password;
    const user = await User.findOne({ email: em });
    console.log(user.password);
    if (!user) {
      req.json({
        message: "user doesn't exist",
      });
    }
    const match = bcrypt.compare(ps, user.password);
    if (match) {
      const data = {
        id: user.id,
      };
      const token = jwt.sign(data, process.env.SECRET);
      res.json({ message: "success", token: token,name:user.name,email:user.email });
    } else res.json({ message: "failure" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
