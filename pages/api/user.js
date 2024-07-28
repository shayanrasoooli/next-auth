import { verifyToken } from "../../utils/Auth";

export default function handler(req, res) {
    if(req.method !== "GET"){
        return;
    }

    const {token} = req.cookies;
    
    
    if (!token) {
        res.status(401).json({status : "failed" , message : "your not logged In"})
    }
    console.log(token);
    const secretKey = process.env.SECRET_KEY
    const result = verifyToken(token , secretKey)

    if (result) {
        res.status(200).json({status: "success" , data : result})
    }else{
        res.status(401).json({status: "failed" , message : "you  are unautorized"})

    }
    res.json({})
}