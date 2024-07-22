import { hash } from "bcryptjs";

async function hashPassword(password){
    const hashedPassword = hash(password , 24)
    console.log(hashedPassword);
    return hashedPassword;
}


export  {hashPassword}