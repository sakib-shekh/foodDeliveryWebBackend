const express = require("express");
const router = express.Router();
const verifyuser = require("../middleware/verifyuser.js");
const fooditems = require("../models/Food.js");
const Categories = require("../models/Categories.js");

router.get("/getfood", verifyuser, async (req, res) => {
  try {
    console.log(req.query.type)
    if (req.query.type === "categories") {

      const data = await Categories.find();
      res.send({ data });
      return;
    }
    else if(req.query.type === "top")
    {
        const data=await fooditems.find();
        res.send({data:data,message:"success"});
        return;
    }
    else {
      console.log(req.query);
      const data = await fooditems.find({"name":{$regex: ".*"+req.query.ss+".*" , $options:'i' }})
      await console.log(data);
        res.send({ data:data,message:"success"});
      
     
      return;
    }
  } catch (error) {
    res.send({error });
    return;
  }

});

module.exports = router;
