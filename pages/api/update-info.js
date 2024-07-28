import User from "../../Model/User";
import { verifyPassword, verifyToken } from "../../utils/Auth";
import ConnectedDB from "../../utils/ConnectedDB";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return
    }

    try {
        await ConnectedDB();
    } catch (error) {
        return res.status(500).json({ status: "failed", message: "Error in connecting to dataBase" });
    }

    const {name , lastName , password} = req.body;
    const { token } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!token) {
        res.status(401).json({status : "failed" , message : "you are not logeIn"})
    }

    const result = verifyToken(token , secretKey);
    
    if (!result) {
        res.status(401).json({status : "failed" , message : "you are unauthorized"})
    }

    const user = await User.findOne({email : result.email})
    
    if (!user) {
        return res.status(404).json({status : "failed" , message : "user doesn't exist"}) 
    }

    const isValid = await verifyPassword(password , user.password)
    console.log(isValid);

    if (!isValid) {
        return res.status(422).json({status : "failed" , message : "password is incorrect"})
    }

    user.name = name;
    user.lastName = lastName;
    user.save();
    res.status(200).json({status : "success" , data : {name , lastName , email: result.email}})


}