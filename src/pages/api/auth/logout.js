import { asyncHandler, cookieSetter } from "@/utils/features";
 const handler=asyncHandler(async(req,res)=>{


if(req.method!=="GET"){
 res.status(400).json({
  message:"Wrong method"
})
}

  cookieSetter(res,null,false)
   res.status(200).json({success:true, message:"Logged out succesfully"})
})
export default handler;