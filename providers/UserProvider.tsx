import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"

import { useAccount } from "wagmi"
import { getSimilarProfiles, getUserInfo } from "../lib/userInfo"
import { useRouter } from "next/router"
import getMetadata from "../lib/getMetadata"

interface attribute {
  value?:string,
  trait_type?:string
}

interface metadata {
  attributes?: attribute[],
  description?: string,
  image?: string,
  name?: string
}

interface userProps {
  getUserData: (address?: string) => Promise<void>
  getUserSimilarProfiles: (address?: string) => Promise<void>
  userInfo: any
  similarProfiles: any
  metaData: metadata
}

interface Props {
  children: ReactNode
}

const UserContext = createContext<Partial<userProps> | null>(null)

export const UserProvider: FC<Props> = ({ children }) => {
  const router = useRouter()
  const routerAddress = router.query.address as string

  const isProfilePage = router.pathname.includes("/profile")

  const { address } = useAccount()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [metaData, setMetaData] = useState<any>(null)
  const [similarProfiles, setSimilarProfiles] = useState<any>([])

  const getUserSimilarProfiles = useCallback(
    async (walletAddress?: string) => {
      if (walletAddress || address) {
        const data: any = await getSimilarProfiles(walletAddress || address)

        if (!data?.similarProfiles.length) return setSimilarProfiles([])

        return setSimilarProfiles(data?.similarProfiles)
      }

      return setUserInfo(null)
    },
    [address],
  )

  const getUserData = useCallback(
    async (walletAddress?: string) => {
      if (walletAddress || address) {
        const info: any = await getUserInfo(walletAddress || address)

        if (!info?.doc) {
          setUserInfo(null)
          if (isProfilePage) router.push("/save-profile")
          return
        }

        const metaData: any = await getMetadata(parseInt(info?.doc.cre8orNumber, 10))

        setMetaData(metaData)

        return setUserInfo(info.doc)
      }

      return setUserInfo(null)
    },
    [address],
  )

  useEffect(() => {
    if (!routerAddress) getUserData()
  }, [getUserData, routerAddress])

  const provider = useMemo(
    () => ({
      similarProfiles,
      userInfo,
      getUserData,
      getUserSimilarProfiles,
      metaData,
    }),
    [similarProfiles, userInfo, metaData, getUserData, getUserSimilarProfiles],
  )

  return <UserContext.Provider value={provider}>{children}</UserContext.Provider>
}

export const useUserProvider = () => useContext(UserContext)
