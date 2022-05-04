import { useSession } from "next-auth/react"

interface AuthProps {
  children: React.ReactNode
}
export default function SessionWrapper({ children }: AuthProps) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
