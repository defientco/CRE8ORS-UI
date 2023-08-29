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
import useCre8orNumber from "../hooks/mintDay/useCre8orNumber"

interface attribute {
  value?: string
  trait_type?: string
}

interface metadata {
  attributes?: attribute[]
  description?: string
  image?: string
  name?: string
}

interface userProps {
  getUserData: (address?: string) => Promise<void>
  getUserSimilarProfiles: (address?: string) => Promise<void>
  userInfo: any
  similarProfiles: any
  metaData: metadata
  cre8orNumber: any
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
  const { cre8orNumber, getCre8orNumber } = useCre8orNumber({ address: routerAddress || address })

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

        await getCre8orNumber()
        return setUserInfo(info.doc)
      }

      return setUserInfo(null)
    },
    [address],
  )

  const getUserMetaData = useCallback(async () => {
    if (cre8orNumber) {
      const metaData: any = await getMetadata(parseInt(cre8orNumber, 10))

      setMetaData(metaData)
    }
  }, [cre8orNumber])

  useEffect(() => {
    getUserMetaData()
  }, [getUserMetaData])

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
      cre8orNumber,
    }),
    [similarProfiles, userInfo, metaData, getUserData, getUserSimilarProfiles],
  )

  return <UserContext.Provider value={provider}>{children}</UserContext.Provider>
}

export const useUserProvider = () => useContext(UserContext)
