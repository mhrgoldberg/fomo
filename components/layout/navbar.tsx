import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()
  return (
    <div>
      {session ? (
        <button onClick={() => signOut()}>Sign Out</button>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}
