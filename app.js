

const express = require("express");
const mongoose = require('mongoose');
const dbConnect = require('./config/data/dbConnect');
const homeRouter = require('./routes/homeRoute');
const { insertMany } = require("./models/dbItemSchema");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use('/home',homeRouter)
mongoose.set('strictQuery',false);
dbConnect()





// app.get("/:customListName", function(req,res){

// });

app.get("/about", function(req, res){
  res.render("about");
});

mongoose.connection.once("open",()=>{
  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
});

