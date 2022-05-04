import { signIn, signOut, useSession, SignInResponse } from "next-auth/react"
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
    border-color: var(--secondary);
    color: var(--secondary-light);
  }

  button {
    background-color: var(--secondary);
    color: var(--primary-dark);
  }
  button:hover {
    background: var(--secondary-dark);
  }
`

export default function Navbar() {
  const { data: session } = useSession()
  const router = useRouter()

  const demoSubmit = async () => {
    const res = (await signIn("credentials", {
      redirect: false,
      email: "demo@demo.com",
      password: "123456",
    })) as SignInResponse | undefined
    if (res?.ok && !res?.error) router.push("/auth-route")
  }

  const renderAuthButton = () => {
    if (session) return <button onClick={() => signOut()}>Sign Out</button>

    const signUpButton = <button onClick={() => router.push("/auth/sign-up")}>Sign Up</button>
    const signInButton = <button onClick={() => signIn()}>Sign In</button>
    const demoButton = <button onClick={demoSubmit}>Demo</button>
    if (router.pathname === "/auth/sign-in")
      return (
        <div>
          {demoButton} {signUpButton}
        </div>
      )
    if (router.pathname === "/auth/sign-up")
      return (
        <div>
          {demoButton} {signInButton}
        </div>
      )

    return (
      <div>
        {demoButton} {signUpButton} {signInButton}
      </div>
    )
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
