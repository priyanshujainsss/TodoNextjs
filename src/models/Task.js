import * as mongoose from "mongoose";

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now   
    }
})


  
const Task =mongoose.models.Task|| mongoose.model("Task",schema)
 export default Task