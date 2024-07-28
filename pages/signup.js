import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function SignUp() {
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

  
    const SignUpHandler = async () => {
        const res = await fetch("/api/Auth/SignUp" , {
            method : "POST" ,
            body : JSON.stringify({email , password}),
            headers : {"Content-Type" : "application/json"},
        })
        const data = await res.json()
        console.log(data);
        if (data.status === "successfully") {
            router.push("/signin")
        }
    } 
  return (
    <div>
        <input value={email} placeholder='email' type='email' onChange={(e) => setEmail(e.target.value)} />
        <input value={password} placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
        <button onClick={SignUpHandler}>Sign Up</button>
    </div>
  )
}

export default SignUp