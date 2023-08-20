import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { useEffect } from "react"
import ProfilePage from "../../components/ProfilePage"
import { useUserProvider } from "../../providers/UserProvider"

const Profile = () => {
  const router = useRouter()
  const { isConnected } = useAccount()
  const { userInfo } = useUserProvider()

  useEffect(() => {
    if (!isConnected || !userInfo) router.push("/save-profile")
  }, [router, isConnected, userInfo])

  return <ProfilePage />
}
export default Profile
