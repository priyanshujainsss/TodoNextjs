import Task  from "@/models/Task";

const { connectDB, errorHandler, getUser } = require("@/utils/features")

const handler=async(req,res)=>{
     
    if(req.method!=="GET") return errorHandler(res,400,"Wrong route")

    await connectDB();
  

const user=await getUser(req)
// console.log("user",user)
if(!user) return errorHandler(res,401,"Login First")
    const tasks=await Task.find({user:user._id})

   
         res.status(200).json({success:true,tasks})



 
}
export default handler