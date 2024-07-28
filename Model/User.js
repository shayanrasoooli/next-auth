import { Schema , model , models } from "mongoose";

const schema = new Schema({
    email : {
        type : String ,
        required : true
    }, 
    password : {
        type : String ,
        required : true
    }, 
    name : {
        type : String 
    }, 
    lastName : {
        type : String 
    }, 
    createdAt : {
        type : Date ,
        default : () => Date.now(),
        immutable : true
    }
})


const User = models.User ||   model("User" , schema)

export default User