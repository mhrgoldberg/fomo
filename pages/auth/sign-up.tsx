import { getProviders, signIn, SignInResponse, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import useFormState from "../../components/forms/useFormState"
import InputField from "../../components/forms/InputField"
import SelectField from "../../components/forms/SelectField"
import { AuthPropTypes } from "."
import { AuthFormContainer } from "../../styles/formStyles"

type SignUpFormState = {
  email: string
  password: string
  role: "STUDENT" | "TEACHER"
}

export default function SignUp({ providers }: AuthPropTypes) {
  const router = useRouter()
  const { data: session } = useSession()

  const {
    state: { form, error },
    update: { setError, updateField, setUpdatedStatusFalse },
  } = useFormState({
    email: "",
    password: "",
    role: "STUDENT",
  } as SignUpFormState)
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
    <AuthFormContainer>
      <h1>Sign Up</h1>
      <div className="providers">
        {providers &&
          Object.values(providers).map((provider) =>
            provider.name === "Credentials" ? null : (
              <button key={provider.name} onClick={() => signIn(provider.id)}>
                Sign Up with {provider.name}
              </button>
            )
          )}
        <button key={"demo"} onClick={demoSubmit}>
          Demo Before Commiting!
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
        <SelectField
          label="Role"
          name="role"
          options={[
            ["STUDENT", "Student"],
            ["TEACHER", "Teacher"],
          ]}
          onChange={updateField}
          state={form.role}
          required
          error={error}
        />
        <button type="submit">Sign Up with Credentials</button>
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
