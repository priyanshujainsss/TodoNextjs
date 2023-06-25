import mongoose from "mongoose"
import {serialize} from 'cookie'
import jwt  from "jsonwebtoken"
import User from "@/models/User"
// const jwt = require('jsonwebtoken');
export const connectDB=async()=>{
const {connection}=await mongoose.connect(process.env.MONGOURI,{
    dbName:"NextTodo"
})
console.log(`Database connected on ${connection.host}`)
return true;
}


export const errorHandler=(res,statusCode=500,message="Server Error")=>{
    return res.status(statusCode).json({
        status:false,
        message
    })
}

export const asyncHandler=(passedFunc)=>(req,res)=>{
    return Promise.resolve(passedFunc(req,res)).catch(err=>{
       return  errorHandler(res,500,err.message)
    })
}

export const cookieSetter=(res,token,set)=>{
//    const token="token value"
    res.setHeader("Set-Cookie",serialize("token",set?token:"",{
        path:"/",
        httpOnly:true,
        maxAge:set?1000*60*60*24*15:0
    }))
}

export const generateToken=(_id)=>{
return jwt.sign({_id},process.env.JWT_SECRET)
}

export const getUser=async(req)=>{
    const cookie=req.headers.cookie
    if(!cookie) return null;
    const token=cookie.split("=")[1]
const decode=jwt.verify(token,process.env.JWT_SECRET);
return await User.findById(decode._id)
}