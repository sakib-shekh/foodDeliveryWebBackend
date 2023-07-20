const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/loginuser", async (req, res) => {
  try {
    let em = req.body.email;
    let ps = req.body.password;
    console.log(em, ps);
    const user = await User.findOne({ email: em });
    console.log("u", user);
    if (!user) {
      res.json({
        message: "user doesn't exist",
      });
      console.log("user not found");
      return;
    }
    const match = await bcrypt.compare(ps, user.password);
    if (match) {
      const data = {
        id: user.id,
      };
      const token = jwt.sign(data, process.env.SECRET);
      res.json({
        message: "success",
        token: token,
        name: user.name,
        email: user.email,
      });
    } else res.json({ message: "email or password is wrong" });
  } catch (error) {
    console.log(error);
    res.json({message:error});
  }
});

module.exports = router;
