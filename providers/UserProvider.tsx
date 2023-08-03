import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react"

import { useAccount } from "wagmi"
import { getUserInfo } from "../lib/userInfo"

interface userProps {
  getUserData: () => Promise<void>
  userInfo: any
}

interface Props {
  children: ReactNode
}

const UserContext = createContext<Partial<userProps> | null>(null)

export const UserProvider: FC<Props> = ({ children }) => {
  const { address } = useAccount()
  const [userInfo, setUserInfo] = useState<any>(null)

  const getUserData = useCallback(async () => {
    if (!address) return setUserInfo(null)

    const info = await getUserInfo(address)

    setUserInfo(info)
  }, [address])

  useEffect(() => {
    getUserData()
  }, [getUserData])

  const provider = useMemo(
    () => ({
      userInfo,
      getUserData,
    }),
    [userInfo, getUserData],
  )

  return <UserContext.Provider value={provider}>{children}</UserContext.Provider>
}

export const useUserProvider = () => useContext(UserContext)
