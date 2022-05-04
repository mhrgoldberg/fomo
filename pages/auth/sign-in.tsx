import {
  ClientSafeProvider,
  getProviders,
  signIn,
  SignInResponse,
  useSession,
} from "next-auth/react"
import { useRouter } from "next/router"
import styled from "styled-components"
import useFormState from "../../components/forms/useFormState"
import InputField from "../../components/forms/InputField"

type SignInPropTypes = {
  providers: ClientSafeProvider | null
}

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--secondary-background);
  width: 35rem;
  border-radius: var(--card-border-radius);
  padding: 4rem;
  div.providers {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 2rem 0;
    border-bottom: 0.2rem dashed var(--secondary-dark);
  }

  div.providers:first-child {
    padding-top: 0;
  }
  form {
    width: 100%;
  }
  label {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
  button {
    width: 100%;
    margin: 0;
    padding: 1rem 2rem;
  }
`

export default function SignIn({ providers }: SignInPropTypes) {
  const router = useRouter()
  const { data: session } = useSession()

  const {
    state: { form, error },
    update: { setError, updateField, setUpdatedStatusFalse },
  } = useFormState({
    email: "",
    password: "",
  })

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = (await signIn("credentials", {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
    })) as SignInResponse | undefined
    if (res?.ok && !res?.error) router.push("/auth-route")
    if (res?.error === "CredentialsSignin") {
      setUpdatedStatusFalse()
      setError(() => "Invalid email or password")
    }
  }

  const demoSubmit = async () => {
    setUpdatedStatusFalse()
    const res = (await signIn("credentials", {
      redirect: false,
      email: "demo@demo.com",
      password: "123456",
    })) as SignInResponse | undefined
    if (res?.ok && !res?.error) router.push("/auth-route")
    if (res?.error === "CredentialsSignin") {
      setError("Invalid email or password")
    }
  }

  if (session) {
    // Redirect to the home page if the user is already signed in
    router.push("/")
    return null
  }

  return (
    <SignInContainer>
      <h1>Sign In</h1>
      <div className="providers">
        {providers &&
          Object.values(providers).map((provider) =>
            provider.name === "Credentials" ? null : (
              <button key={provider.name} onClick={() => signIn(provider.id)}>
                Sign In with {provider.name}
              </button>
            )
          )}
        <button key={"demo"} onClick={demoSubmit}>
          Sign in with Demo User
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={updateField}
          state={form.email}
          required
          error={error}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Secrets go here!"
          onChange={updateField}
          state={form.password}
          required
          error={error}
        />
        <button type="submit">Sign In with Credentials</button>
      </form>
    </SignInContainer>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  }
}
