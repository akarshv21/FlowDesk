import { Timestamp } from "mongodb";
import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    email:{type:String,require:true,
    unique:true,trim:true,
    lowercase:true},
    password:{
        type:String,
        require:true,
        select:false,//this will bydefault remove pswd while fetching data if we need,select  it
        unique:true,
    },
    name:{type:String,require:true,trim:true},
    tagline: {
    type: String,
    trim: true,
    maxlength: 120,
    default: "",},
    bio: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "",
},
    ProfilePicture:{type:String},
    isEmailVerified:{type:Boolean,default:false},
    lastlogin:{type:Date},
    is2FAEnabled:{type:Boolean,default:false},
    twoFAOtp:{type:String,select:false},
    twoFAOtpExpires:{type:Date,select:false},
},
{timestamp:true}
);

const User=mongoose.model("User",userSchema);

export default User;