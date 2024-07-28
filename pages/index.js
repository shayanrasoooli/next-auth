import Link from "next/link";

export default function Home() {
  const signOutHandler = async () => {
    const res = await fetch("api/Auth/signout");
    const data = res.json()
    console.log(data);

  }
  return (
    <div>
     <button><Link href='/dashboard'>Dashboard</Link></button>
     <button><Link href='/signup'>Sign Up</Link></button>
     <button><Link href='/signin'>Sign In</Link></button>
     <button onClick={signOutHandler}>Log out</button>
    </div>
  )
}