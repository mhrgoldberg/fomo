import type { GetServerSidePropsContext } from "next"
import { getCsrfToken, signIn, SignInResponse, useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/router"

type SignInProps = {
  csrfToken: string | undefined
}

export default function SignIn({ csrfToken }: SignInProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = (await signIn("credentials", {
      redirect: false,
      email,
      password,
    })) as SignInResponse | undefined

    if (!res?.error) {
      router.push("/auth-route")
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    }
  }

  if (session) {
    // Redirect to the home page if the user is already signed in
    router.push("/")
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label>
        Email
        <input name="email" type="text" onChange={onChange} />
      </label>
      <label>
        Password
        <input name="password" type="password" onChange={onChange} />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}
