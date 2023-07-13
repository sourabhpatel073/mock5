const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const { UserModel } = require("../model/userModel")
const mongoose=require("mongoose")
const userRouter=express.Router()
userRouter.use(express.json())

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    
    

    try{
        bcrypt.hash(password,5,async function (err,hash){
            if(err){console.log(err)
            return}
           console.log("heelo")
            const user=new UserModel({email,password:hash})
            await user.save()
            console.log(user)
            res.status(200).send("user registered successfully")
        })
       
    }
    catch(err){
        res.status(400).send("registaration fail")
        console.log("action failed")
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.findOne({email})
        console.log(user)
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    console.log(err)
                }
                if(result){
                    const token=jwt.sign(
                        {authorID:user._id,author:user.user_name},"masai"
                    )
                    res.status(200).send({msg:"login success",token:token})
                }else{
                    res.status(200).send({msg:"wrong details"})
                }
            })
        }

    }
    catch(err){
        res.status(200).send({msg:err})
    }
}
)
module.exports={userRouter}