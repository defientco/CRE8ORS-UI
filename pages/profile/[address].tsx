import { GetServerSideProps } from "next"
import validator from "validator"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAccount } from "wagmi"
import { useProfileProvider } from "../../providers/ProfileContext"
import ProfilePage from "../../components/ProfilePage"
import { useUserProvider } from "../../providers/UserProvider"

interface ProfileProps {
  address: string
}

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({ params, req }) => {
  if (!params || !params.address)
    return {
      notFound: true,
    }

  const protocol = req.headers["x-forwarded-proto"] || "http"
  const host = req.headers["x-forwarded-host"] || req.headers.host
  const domain = `${protocol}://${host}`

  const address = params.address as string

  if (!validator.isEthereumAddress(address))
    return {
      notFound: true,
    }

  try {
    const res: any = await axios.get(`${domain}/api/v2/get/userprofile?walletAddress=${address}`)

    if (!res.data?.doc) {
      return {
        redirect: {
          destination: "/save-profile",
          permanent: false,
        },
      }
    }

    return {
      props: {
        address,
      },
    }
  } catch (err) {
    return {
      notFound: true,
    }
  }
}

const Profile = () => {
  const { address } = useAccount()
  const { setIsHiddenEditable } = useProfileProvider()

  const { getUserData } = useUserProvider()

  const router = useRouter()

  useEffect(() => {
    getUserData(router.query.address as string)

    if (address !== router.query.address) {
      setIsHiddenEditable(true)
      return
    }

    setIsHiddenEditable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return <ProfilePage />
}

export default Profile
