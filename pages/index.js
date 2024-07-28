import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn , setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    fetch("/api/auth")
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") setIsLoggedIn(true)
    })

  } , [])

  const signOutHandler = async () => {
    const res = await fetch("api/Auth/signout");
    const data = res.json()
    if (data.status === "success") setIsLoggedIn(false)


  }
  return (
    <div>
      {isLoggedIn ? (
        <>
        <button><Link href='/dashboard'>Dashboard</Link></button>
        <button onClick={signOutHandler}>Log out</button>
        </>
      ) : null}
 
    {!isLoggedIn ? (
      <>
      <button><Link href='/signup'>Sign Up</Link></button>
      <button><Link href='/signin'>Sign In</Link></button>
      </>

    ): null}
    </div>
  )
}