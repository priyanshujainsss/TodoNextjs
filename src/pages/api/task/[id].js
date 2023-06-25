import Task  from "@/models/Task";

const { connectDB, errorHandler, getUser } = require("@/utils/features")

const handler=async(req,res)=>{
     
    if(req.method=="PUT") 
    {
        await connectDB();
        
   const user=await getUser(req)

     if(!user) return errorHandler(res,401,"Login First")
    console.log("===============querry===========",req.query)

    const taskId=req.query.id;
    const task=await Task.findById(taskId);
    if(!task){
        return errorHandler(res,404,"Task not found")
 
    }
    task.isCompleted=!task.isCompleted
    task.updatedAt=new Date()
    console.log("==========task============",task)

    await task.save();

    res.status(200).json({success:"task updated successfully"})

    }
    else if(req.method=="DELETE"){
        await connectDB();
        
        const user=await getUser(req)
     
          if(!user) return errorHandler(res,401,"Login First")
         console.log("===============querry===========",req.query)
     
         const taskId=req.query.id;
         const task=await Task.findByIdAndDelete(taskId);
         if(!task){
             return errorHandler(res,404,"Task not found")
      
         }
      
     
         res.status(200).json({success:"task deleted successfully"})
    }
    else{

        return errorHandler(res,400,"Wrong route")
    }

  


   



 
}
export default handler