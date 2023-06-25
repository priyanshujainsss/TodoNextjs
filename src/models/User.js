import mongoose from "mongoose";

const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,"Password too short"]
    },
})

// mongoose.model={}
 const User=mongoose.models.User|| mongoose.model("User",Schema)
 export default User;