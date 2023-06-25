import User from "@/models/User";
import { asyncHandler, connectDB, cookieSetter, errorHandler, generateToken } from "@/utils/features";
import bcrypt from 'bcrypt'
 const handler=asyncHandler(async(req,res)=>{
  const {name, email,password}=req.body;

if(req.method!=="POST"){
res.status(400).json({
  message:"Wrong method"
})
}

await connectDB()


   let user=await User.findOne({email})
  
   if(!name || !email ||!password)
   return errorHandler(res,400,"Please enter all details")

   if(user){
      return errorHandler(res,400,"User alraedy Exist")
   }

   const hashedPassword=await bcrypt.hash(password,10)
 user = await User.create({
    name,email,password:hashedPassword
   })
   
  const token=generateToken(user._id)
  cookieSetter(res,token,true)
  res.status(201).json({success:true, message:"Registered succesfully",user})


})
export default handler;