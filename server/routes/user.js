const {Router} = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/user");

const router = Router();
const secret = "AvadhutMali"

router
    .route("/signup")
    .post(async(req,res)=>{
        const {username,password} = req.body;
        try{
            const exituser = await user.findOne({username})

            if(exituser){
                return res.status(401).json({message :"Username Already Exits"})
            }
            const hashPass = await bcrypt.hash(password,10)
            const newUser = user({username,password:hashPass})
            await newUser.save()
            res.status(201).json({message:"User has Creadted Succesfully"})
        }catch(error){
            res.status(500).json({message:"Server Error ",error})
        }  
    })

router 
    .route("/login")
    .post(async(req,res)=>{
        const {username,password} = req.body;
        try{
            const User = await user.findOne({username})
            if(!User)return res.status(400).json({message:"Invalid Username or password"})

            const isPassword = await bcrypt.compare(password,User.password)
            if(!isPassword)return res.status(400).json({message:"Invalid Username or password"})
            
            const token = jwt.sign({userId: User._id},secret)

            res.status(200).json({token,username:User.username})
        }catch(error){
            res.status(500).json({message:"Server Error", error})
        }
    })

module.exports = router