import Link from "next/link";

export default function Home() {
  return (
    <div>
     <button><Link href='/signup'>Sign Up</Link></button>
     <button><Link href='/signin'>Sign In</Link></button>
    </div>
  )
}