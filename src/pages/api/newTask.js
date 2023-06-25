import Task  from "@/models/Task";

const { connectDB, errorHandler, getUser } = require("@/utils/features")

const handler=async(req,res)=>{
     
    if(req.method!=="POST") return errorHandler(res,400,"Wrong route")

    const response=await connectDB();
    if(response){
    // return res.json({messgae:"Database connected"})
    const {title,description,date}=req.body;
    
    if(!title|| !description || !date){
    return errorHandler(res,400,"Required title, description and date")
    }

const user=await getUser(req);
if(!user)  return errorHandler(res,401,"Login First")

    
        await Task.create({
            title,
            description,
            date,
            user:user._id
        })
        return res.status(201).json({message:"Task created",status:true})
}
else{
return res.status(500).json({message:"Internal server error",status:false})

}
 
}
export default handler