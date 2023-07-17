const express=require('express');
const dotenv=require('dotenv');
const mongoConnect = require('./db.js');
const cors =require('cors')

dotenv.config({path:"./config/config.env"});

const app=express();
app.use(express.json());
app.use(cors());
mongoConnect();

app.use('/api',require("./routes/CreateUser.js"));
app.use('/api',require("./routes/loginUser.js"));
app.use('/api',require("./routes/SendFood.js"))
app.listen(process.env.PORT,{useNewUrlParser:true },(err,result)=>{
    if(err)
    {
        console.log("---",err);
    }
    else
    {console.log(`server started on port ${process.env.PORT}`);}
})
app.get("/",(req,res)=>{
    res.send("hello world!")
});