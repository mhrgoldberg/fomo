import { useSession } from "next-auth/react"

function Dashboard() {
  const { data: session } = useSession()
  return <div>{session?.user?.email}</div>
}

Dashboard.auth = true

export default Dashboard
