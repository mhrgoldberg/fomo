import { useSession } from "next-auth/react"

function AuthRoute() {
  const { data: session } = useSession()
  return <div>{session?.user?.email}</div>
}

AuthRoute.auth = true

export default AuthRoute
