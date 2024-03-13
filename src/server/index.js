
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

//Intiating Express Server
const app = express();

//To parse the JSON format data
app.use(express.json());

//CORS -> Cross Origin Resource Sharing, used to request resources (such as APIs or static files) from each other's domains
app.use(cors())

//Url for connnecting the MongoDB Atlas
const dbUrl = "mongodb+srv://arul_08:Arul123@cluster0.57wnpn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//Connecting MongoDB
mongoose.connect(dbUrl);

//Schema structure
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    joined: String,
    about: String,
    profilepic: String,
    created: String,
    following: String,
    saved: String
});


//Model for inserting data with the given schema 
//MongoDB by default creates a collection with plural name of the Model
const User = new mongoose.model('User', userSchema);


//POST method request for Login
app.post('/auth/login', async(req,res)=>{
    let userName = req.body.username;
    let passWord = req.body.password;   

    try{
        let user = await User.findOne({username: userName});

        //Comparing the user entered password and stored password(hashed)
        let passwordMatched = await bcrypt.compare(passWord, user.password);

        if(!user || !passwordMatched){
            res.status(401).json({message: "Invaild username/password"});
        }

        res.json({username: user.username, message: "valid-user"});
    }catch(e){
        res.status(402).json({message: "Server Error"});
    }
});

//POST method for signup
app.post('/auth/signup', async(req,res) =>{
    let userName = req.body.username;
    let passWord = req.body.password; 
    let join = req.body.joined;
    let j = join.split(',');
    let joinDate = `${j[0]} ${months[ j[1] - 1 ]} ${j[2]}`;
    
    //Hashing the password for security purpose
    const hashedPassword = await  bcrypt.hash(passWord, 10);

    try{
        let user = await User.findOne({username: userName});
        if(user){
            res.status(401).json({message: "Username already registered"});
        }
        else{
            let newUser = new User({
                username: userName,
                password: hashedPassword,
                joined: joinDate
            });
            await newUser.save().then(()=>{
                res.json({message: "registered"});
            })
        }
    }catch(e){
        res.status(402).json({message: "Server Error"});
    }
});

//List all the users
app.get('/user', async(req,res)=>{
    let userName = req.query.name;
    try{
    let user = await User.findOne({username: userName});
    if(user)
        res.status(201).json(user);
    else
        res.status(404).json({message: "User not found"}); 
    }
    catch(e){
        res.status(402).json({message: "Server Error"});
    }
})

app.listen(6010, () => {
    console.log("Server listening to port ", 6010);
})