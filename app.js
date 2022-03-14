require("dotenv").config();
const aastha=require('express');
const app=aastha();
const bodyparser=require('body-parser');
const jsonEncoder=bodyparser.json();
const mongo=require('mongoose');
const {User,ObjectId}=require('./models/user');
const routes=require('./routes/routes');

let port= process.env.PORT;
let host= process.env.HOST;


mongo.connect('mongodb+srv://Aastha:mqtkSMVqNXuijFDa@cluster0.9kzsa.mongodb.net/Aastha?retryWrites=true&w=majority').then(()=>{
    console.log('Mongo Connected!');
})
// const user= new User({name:'Aastha',email:'aasthabhardwaj333@gmail.com',address:'Noida'});
// user.save().then(()=>
// console.log("Saved"))

app.set('view engine','ejs');

app.use(routes);
app.get('/cool',function(req,res){
     res.render('test.ejs');
})

app.post('/register',jsonEncoder,function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password;
    var address=req.body.address;
    
    var data=new User({
        name:name,
        email:email,
        password:password,
        address:address
    })
    data.save().then(()=>{
        res.end('Data Saved!');
    })

    

})

app.get('/getById/:id',jsonEncoder,function(req,res){
    User.findOne({_id:ObjectId(req.params.id)}).then((data)=>
    {
        if(data)
            res.json(data);
        else
            res.json("No Data Exist");
    })
})

app.post('/login',jsonEncoder,function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    User.findOne({email:req.body.email,password:req.body.password}).then((data)=>{
        if(data)
        {
            res.end('Logged In!');
        }
        else
        {
            res.end('Invalid Credential!');
        }
    })
})

app.delete('/delete',(req,res)=>{
    User.deleteOne(
        {_id:ObjectId(req.params.id)}
    )
    .then(result => {
        if(result)
            res.json(result+`Deleted`);
        
        else
            res.json(`Empty`);
      })
      .catch(error => console.error(error))
});

app.put('/put',(req,res)=>{
    User.findOneAndUpdate({_id:ObjectId(req.body.id)}
    )
    .then(result=>{
        console.log(result)
    })
    .catch(error => console.error(error))
})

app.listen(port,() =>{
    console.log(`We are in http://${host}:${port}/cool`)
});