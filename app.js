const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user.js");

const MONG_URL = "mongodb://127.0.0.1:27017/AMYA";

main()
    .then(()=>{
        console.log("connected to db");
    })
    .catch((er)=>{
        console.log(er);
    })
async function main(){
    await mongoose.connect(MONG_URL);
}

app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine ","ejs");
app.set("viewss",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

app.get("/signin",(req,res)=>{
    res.render("login.ejs");
})
app.get("/",(req,res)=>{
    res.render("index.ejs");
})
app.get("/renderlogin",(req,res)=>{
  res.render("login.ejs");
})
app.post("/login",async (req,res)=>{
  try {
    let { username, email, password } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);
    const newUser = new User({ email, username });
    const resUser = await User.register(newUser, password);
    req.login(resUser, (er) => {
      if (er) {
        return next(er);
      }
      res.redirect("/");
    });
  } catch (er) {
    res.redirect("/");
  }
})

app.listen(8080, () => {
    console.log("server is at port 8080 ");
  });