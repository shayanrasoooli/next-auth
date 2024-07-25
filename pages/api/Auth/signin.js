import { sign } from "jsonwebtoken";
import User from "../../../Model/User";
import { verifyPassword } from "../../../utils/Auth";

export default async function handler(req , res) {
    if (req.method === "POST") {
        return;
    }

    try {
        await  ConnectedDB()
    } catch (error) {
        return res.status(500).json({status : "failed" , message : "Error in connecting to dataBase"})
    }

    const {email , password } = req.body;
    const secretKey = process.env.SECRET_KEY;
    const expiration = 24 * 60 * 60;
    

    if (!email || !password) {
        return res.status(422).json({status : "failed" , message : "Invalid Data"})
    }

    const  user = User.findOne({email : email})

    if(!user){
        return res.status(404).json({status : "failed" , message : "user doesnt exist"})
    }


    const isValid = verifyPassword(password , user.password);

    if (!isValid) {
        return res.status(422).json({status : "failed" , message : "userName or Password is incorrect"})
    }

    const token = sign({email} , secretKey , {expiresIn : expiration })
    

}