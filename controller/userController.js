const express=require('express')
const app=express();
const mongoose=require('mongoose')
const bodyparser=require('body-parser');
const {User,ObjectId}=require('../models/user');

const register=function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password; 
    var address=req.body.address;
    const user=new User({
        name:name,
        email:email,
        password:password,
        address:address
    })
    user.save().then((data)=>{
        console.log(data+" Saved!")
        res.json(data);
    })
}

module.exports={
    register
}