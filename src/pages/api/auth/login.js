import User from "@/models/User";
import { asyncHandler, connectDB, cookieSetter, errorHandler, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt'
 const handler=asyncHandler(async(req,res)=>{
  const { email,password}=req.body;

if(req.method!=="POST"){
res.status(400).json({
  message:"Wrong method"
})
}

await connectDB()
  
const user=await User.findOne({email}).select("+password")

   if( !email ||!password)
   return errorHandler(res,400,"Please enter all details")
   
   if(!user){
    return errorHandler(res,400,"Invalid Credentials")
  
  }
    const isMatch=await bcrypt.compare(password,user.password)
    if( !isMatch)
    return errorHandler(res,400,"Invalid Email or Password")

  
   
  const token=generateToken(user._id)
  cookieSetter(res,token,true)
  res.status(200).json({success:true, message:"Login succesfully",user})
})
export default handler;