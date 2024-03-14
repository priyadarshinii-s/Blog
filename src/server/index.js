const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');


var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

const app = express();

app.use(express.json());

app.use(cors())

const dbUrl = "mongodb+srv://arul_08:Arul123@cluster0.57wnpn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(dbUrl);

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


const blogPostSchema = new mongoose.Schema({
    id: String,
    Title: String,
    Subtext: String,
    tag: String,
    Author: String,
    dateCreated: { type: Date, default: Date.now },
    content: Object,
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);


const User = new mongoose.model('User', userSchema);

app.post('/auth/login', async(req,res)=>{
    let userName = req.body.username;
    let passWord = req.body.password;   

    try{
        let user = await User.findOne({username: userName});

        let passwordMatched = await bcrypt.compare(passWord, user.password);

        if(!user || !passwordMatched){
            res.status(401).json({message: "Invaild username/password"});
        }

        res.json({username: user.username, message: "valid-user"});
    }catch(e){
        res.status(402).json({message: "Server Error"});
    }
});


app.post('/auth/signup', async(req,res) =>{
    let userName = req.body.username;
    let passWord = req.body.password; 
    let join = req.body.joined;
    let j = join.split(',');
    let joinDate = `${j[0]} ${months[ j[1] - 1 ]} ${j[2]}`;
    
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
});


app.post('/post/upload', async(req,res)=>{

   const hashedId = await  bcrypt.hash(req.body.Title, 10);

    let val = req.body;
    val = {...val, id: hashedId}
    

    if(req.body){
        let newBlog = new BlogPost(val);
    await newBlog.save().then(()=>{
        res.json({message: "Upload success"});
    })
    }
    else{
        res.status(304).send({message: "error"})
    }
})


app.get('/post', async(req,res)=>{
    let t = req.query.tag;
    try{
    let posts = await BlogPost.find({tag: t});
    if(posts)
        res.status(201).json(posts);
    else
        res.status(404).json({message: "Post not found"}); 
    }
    catch(e){
        res.status(402).json({message: "Server Error"});
    }
})

app.get('/posts', async(req,res)=>{
    let id = req.query.id;
   
    let posts = await BlogPost.find({id: id});
    if(posts)
        res.status(201).json(posts);
    else{
        res.status(404).json({message: "Posts not found"}); 
    }
})

app.get('/allposts', async(req,res)=>{

    let posts = await BlogPost.find();
    if(posts)
        res.status(201).json(posts);
    else{
        res.status(404).json({message: "Posts not found"}); 
    }
});

app.get('/search', async (req, res) => {
    const { keyword } = req.query;
    try {
        const matchedPosts = await BlogPost.find({ Title: { $regex: keyword, $options: 'i' } });
        
        res.json(matchedPosts);
    } catch (err) {
        console.error("Error searching posts:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/saved', async (req, res) => {
    const { user } = req.query;
    try {
        const matchedPosts = await BlogPost.find({ Author: user});
       
        res.json(matchedPosts);
    } catch (err) {
        console.error("Error searching posts:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, about, profilepic } = req.body;

    try {
        const user = await User.findById(userId);
        const result = await BlogPost.updateMany({ _id: userId }, { $set: { Author: username}});

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.about = about || user.about;
        user.profilepic = profilepic || user.profilepic;

        await user.save();

        res.status(200).json({ message: "User data updated successfully" });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.delete('/deletepost', async (req, res) => {
    const postId = req.query.id;


    try {
        await BlogPost.deleteOne({id: postId});
        res.status(201).send({message: "Deleted"});
    }
    catch(e){
        console.log(e);
    }
})


app.listen(5000, () => {
    console.log("Server listening to port ", 5000);
})