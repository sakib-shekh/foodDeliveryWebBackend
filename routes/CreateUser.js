const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/createuser", async (req, res) => {
  try {
    console.log("hi");
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword,
    });
    const user = await User.findOne({ email: req.body.email });
        console.log(user.password);
    const data={
      id:user.id
    }
    const token=jwt.sign(data,process.env.SECRET);
    res.json({ message: "ok",token:token , name:req.body.name,email:req.body.email});
  } catch (err) {
    console.log(err);
    res.json({ message: "error occurs" });
    return;
  }
});

module.exports = router;
