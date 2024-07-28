import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SignIn() {
const [email  , setEmail] = useState("")
const [password  , setPassword] = useState("")
const router = useRouter()

  useEffect(() => {
    const  res = fetch("/api/user")
    .then(res => res.json())
    .then(data => {
       if (data.status === "success") {
        router.replace("/dashboard")
       }
    })
  } , [])





    const SignInHandler = async () => {
        const res = await fetch("/api/Auth/signin" , {
            method : "POST" ,
            body : JSON.stringify({email , password}),
            headers : {"Content-Type" : "application/json"},
        })
        const data = await res.json()
        console.log(data);
        // if (data.status === "success") {
        //     router.push("/signin")
        // }  
    } 
  return (
    <div>
        <input value={email} placeholder='email' type='email' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={SignInHandler}>Sign In</button>
    </div>
  )
}

export default SignIn