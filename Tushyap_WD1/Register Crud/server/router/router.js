const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
require('../database/connection');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`Hello world from router contact `);
});



// router.post('/register',(req, res)=>{
//     const {name, email, phone, password, cpassword} = req.body;
//     if ( !name || !email || !phone || !password || !cpassword ){
//         return res.status(422).json({error: "Please fill the field properly"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }

//         const user = new User({ name, email, phone, password, cpassword });
//         user.save().then(()=>{
//             res.status(201).json({message:"User registered successfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed to register"}))
//     }).catch(err =>{console.log(err);});
// }); 

router.post('/register', async (req, res) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the field properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "Email already exist" });
        }else if(password !== cpassword){
            return res.status(422).json({ error: "Confirm password not matching" }); 
        }
        else{
            const user = new User({ name, email, phone, password, cpassword });

        await user.save();
        res.status(201).json({ message: "User registered successfully" }); 
        }
        

    } catch (err) {
        console.log(err);
    }

});

// login route

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the required field" });
        }
        const userLogin = await User.findOne({ email: email });
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token =  await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now()+ 25892000000),
                httpOnly: true
            });
           if(!isMatch){
                res.status(400).json({ error: "Invalid Password or Email" });
            }else{
                res.json({ message: "User Signin successfully" });  
            }
            
        }else{
            res.status(400).json({ error: "Invalid Password or Email" });
        }
        
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;