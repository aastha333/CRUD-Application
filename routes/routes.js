const express=require('express');
const route=express.Router();

const bodyparser=require('body-parser');
const jsonencoder=bodyparser.json();

const userController=require('../controller/userController');

route.get('/aastha',jsonencoder,userController.register);

module.exports=route;