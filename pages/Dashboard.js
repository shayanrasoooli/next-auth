import React, { useState } from 'react'
import { verifyToken } from '../utils/Auth';
import { redirect } from 'next/dist/server/api-utils';

function Dashboard({result}) {
  const [name , setName] = useState("")
  const [lastName , setLastName] = useState("")
  const [password , setPassword] = useState("")

  const submitHandler = async () => {
    const res =await fetch("/api/update-info" , {
      method : "POST" , 
      body : JSON.stringify({name , lastName , password}),
      headers : {"Content-Type" : "application/json"}
    })
    const data = await res.json()
    console.log(data);
  }

  return (
    <div>
      <h3>Dashboard</h3>
      <p>your email is {result.email}</p>
      <h3>complete your profile</h3>
      <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input placeholder='lastName' type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submitHandler}>Submit</button>
    </div>
  )
}

export default Dashboard


export  async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY
  const result = verifyToken(token , secretKey)

  if (!result) {
    return {
      redirect : {

        destination : '/signin',
        permanent : false
      }
    }
  }

  return {
    props : {
      result
    }
  }

}