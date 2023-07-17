const mongoose = require("mongoose");

const mongoConnect=async()=>{
   await mongoose.connect(process.env.URL);
   console.log("database connected!");
}
module.exports = mongoConnect;

