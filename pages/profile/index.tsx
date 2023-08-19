import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { useEffect } from "react"
import ProfilePage from "../../components/ProfilePage"
import { ProfileProvider } from "../../providers/ProfileContext"

const Profile = () => {
  const router = useRouter()
  const { isConnected } = useAccount()

  useEffect(() => {
    if (!isConnected) router.push("/save-profile")
  }, [router, isConnected])

  return (
    <ProfileProvider>
      <ProfilePage />
    </ProfileProvider>
  )
}
export default Profile
