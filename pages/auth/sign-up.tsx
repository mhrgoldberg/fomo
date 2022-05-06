import { getProviders, signIn, SignInResponse, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import useFormState from "../../components/forms/useFormState"
import InputField from "../../components/forms/InputField"
import { AuthPropTypes } from "."
import { AuthFormContainer } from "../../styles/formStyles"
import { UserResponse } from "../../lib/users/controller"
import createError, { ErrorResponse, ErrorWithData } from "../../lib/createError"

type SignUpFormState = {
  name: string
  email: string
  password: string
}

export default function SignUp({ providers }: AuthPropTypes) {
  const router = useRouter()
  const { data: session } = useSession()
  const {
    state: { form },
    update: { updateField, setUpdatedStatusFalse, updateErrorFields },
  } = useFormState({
    email: "",
    password: "",
    name: "",
  } as SignUpFormState)

  const userMutation = useMutation(
    async (newUser: SignUpFormState) => {
      const res = await fetch("/api/users", { method: "POST", body: JSON.stringify(newUser) })
      if (!res.ok) {
        const data: ErrorResponse = await res.json()
        throw createError(data)
      }
      const data: UserResponse = await res.json()
      return data.user
    },
    {
      onSuccess: async (data, variables) => {
        const res = (await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: variables.password,
        })) as SignInResponse | undefined
        if (res?.ok && !res?.error) router.push("/auth-route")
      },
      onError: (e: ErrorWithData) => {
        updateErrorFields(e.data.errors)
      },
    }
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    userMutation.mutate({
      name: form.name.value.toString(),
      email: form.email.value.toString(),
      password: form.password.value.toString(),
    })
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
          label="Username"
          type="text"
          name="name"
          placeholder="Something fun!"
          onChange={updateField}
          state={form.name}
          required
          error={form.name.error}
        />
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
