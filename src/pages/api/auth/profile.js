import { asyncHandler, errorHandler, getUser } from "@/utils/features";
 const handler=asyncHandler(async(req,res)=>{


if(req.method!=="GET"){
res.status(400).json({
  message:"Wrong method"
})
}
const user=await getUser(req);
if(!user) return errorHandler(res,401,"Login First")


  res.status(200).json({success:true, user})
})
export default handler;