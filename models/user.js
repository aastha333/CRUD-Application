const mongoose=require("mongoose")
const { ObjectId }=mongoose.Types;

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String
})

module.exports=
{
    User:mongoose.model("User",userSchema),
    ObjectId
}