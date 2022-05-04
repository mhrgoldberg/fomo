import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"

const NavContainer = styled.nav`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 7rem;
  background-color: var(--primary-dark);
  border-bottom: 1rem solid var(--primary-light);
  margin-bottom: 4rem;
  a {
    font-size: 2.5rem;
    color: var(--text-on-primary);
  }
  a:hover {
    border-color: var(--accent);
    color: var(--secondary);
  }

  button {
    background-color: var(--secondary);
    color: var(--primary-dark);
    border: none;
  }
  button:hover {
    background: var(--secondary-dark);
  }
`

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  const renderAuthButton = () => {
    if (router.pathname === "/auth/sign-in") return null
    if (session) return <button onClick={() => signOut()}>Sign Out</button>
    return <button onClick={() => signIn()}>Sign In</button>
  }

  return (
    <NavContainer>
      <ul>
        <Link href="/">Home</Link>
      </ul>
      <span>{renderAuthButton()}</span>
    </NavContainer>
  )
}
