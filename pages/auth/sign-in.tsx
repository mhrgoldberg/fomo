import { getProviders, signIn, SignInResponse, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import useFormState from "../../components/forms/useFormState"
import InputField from "../../components/forms/InputField"
import { AuthPropTypes } from "."
import { AuthFormContainer } from "../../styles/formStyles"

type SignInFormState = {
  email: string
  password: string
}

export default function SignIn({ providers }: AuthPropTypes) {
  const router = useRouter()
  const { data: session } = useSession()

  const {
    state: { form },
    update: { updateField, setUpdatedStatusFalse, updateErrorFields },
  } = useFormState({
    email: "",
    password: "",
  } as SignInFormState)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = (await signIn("credentials", {
      redirect: false,
      email: form.email.value,
      password: form.password.value,
    })) as SignInResponse | undefined
    if (res?.ok && !res?.error) router.push("/dashboard")
    if (res?.error === "CredentialsSignin") {
      updateErrorFields({
        password: "Email or password is incorrect",
      })
    }
  }

  const demoSubmit = async () => {
    setUpdatedStatusFalse()
    const res = (await signIn("credentials", {
      redirect: false,
      email: "demo@demo.com",
      password: "123456",
    })) as SignInResponse | undefined
    if (res?.ok && !res?.error) router.push("/dashboard")
    if (res?.error === "CredentialsSignin") {
      updateErrorFields({
        email: "Email or password is incorrect",
        password: "Email or password is incorrect",
      })
    }
  }

  if (session) {
    // Redirect to the home page if the user is already signed in
    router.push("/")
    return null
  }

  return (
    <AuthFormContainer>
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
          error={form.email.error}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Secrets go here!"
          onChange={updateField}
          state={form.password}
          required
          error={form.password.error}
        />
        <button type="submit">Sign In with Credentials</button>
      </form>
    </AuthFormContainer>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders(),
    },
  }
}
