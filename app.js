//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");

const app = express();
const items = ["Buy food", "Cook food", "Eat food"];
const workitems = [];
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set('view engine', 'ejs');


app.get("/", function(req, res){
    res.render("List", {listTitle:date.getDate(), newItems: items});
})

app.post("/", function(req, res){
    let item = req.body.item;
    if(req.body.submit === "Work"){
        workitems.push(item);
        res.redirect("/work")
    }else{
        items.push(item);
        res.redirect("/")
    }
    
})

app.get("/work", function(req, res){
    res.render("List", {listTitle:"Work", newItems: workitems});
})


app.listen(3000, function(){
    console.log("Server has started on port 3000")
})