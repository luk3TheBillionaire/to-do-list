const express = require('express');
const defaultItems = require('../modules/defaultItems');
const Item = require('../models/dbItemSchema');
const date = require("../modules/date");
const List = require('../models/dbListSchema');
const { render } = require('ejs');
const _ = require('lodash');
const homeRouter = express.Router();
homeRouter.use(express.static('public'));

const day = date.getDate();
homeRouter
    .get("/", function(req, res) {

        Item.find({},(err,foundItems)=>{
          try {
            console.log(foundItems);
            if (foundItems.length===0){
              console.log(`Path 1`);
              Item.insertMany(defaultItems,(err)=>{
                if (err)console.log(err);
              });
              res.redirect("/home");
            } else {
              console.log(`Path 2`)
              res.render("list", {listTitle: "Today", newListItems:foundItems});
            }
         
          }catch (error)
          {
            console.error(error)
          }
        });
    })
    .get('/:customListName',(req,res)=>{
        const customListName = _.capitalize(req.params.customListName)

        List.findOne({name:customListName},(err,results)=>{
            if(err) console.error(err)
            if(!results){
                
                
                const newlist = new List({
                    name:customListName,
                    items:defaultItems
                });
                newlist.save()
                
                res.render('list',{listTitle: newlist.name , newListItems:newlist.items})
            } else {
               res.render('list',{listTitle: results.name , newListItems:results.items})
            }
        })
    })
    .post("/", function(req, res){
        const itemName=req.body.newItem
        const listName=req.body.list

        const newItem = new Item ({
          name:itemName
        })
        
        if (listName === "Today") {
          workItems.push(item);
          newItem.save((err,result)=>{
              res.redirect("/");
            
          })
        } else {
         List.findOne({name:listName},(err,foundlist)=>{
            if(err) console.err(err)
            foundlist.items.push(newItem);
            foundlist.save((err,result)=>{

                res.redirect("/"+listName)
            });
         })
        }
      })
    .post('/delete',(req,res)=>{
        const checkedItemId=req.body.removeItem
        const listName = req.body.listName

        if (listName==="Today"){

            Item.findByIdAndRemove(req.body.removeItem,(err)=>{
                if(!err) console.log(`Successfuly deleted checked Item`)
                res.redirect("/home");
            });
        } else {
            List.findOneAndUpdate({name:listName},{$pull:{item: {_id:checkedItemId}}},(err,results)=>{
           if(!err) console.log(`Successfully deleted`);
            });
        }
      });
    
      module.exports=homeRouter