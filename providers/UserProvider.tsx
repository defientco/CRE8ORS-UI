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
  getUserData: (address?: string) => Promise<void>
  userInfo: any
}

interface Props {
  children: ReactNode
}

const UserContext = createContext<Partial<userProps> | null>(null)

export const UserProvider: FC<Props> = ({ children }) => {
  const { address } = useAccount()
  const [userInfo, setUserInfo] = useState<any>(null)

  const getUserData = useCallback(
    async (walletAddress?: string) => {
      if (walletAddress || address) {
        const info: any = await getUserInfo(walletAddress || address)

        if (!info?.doc) setUserInfo(null)

        return setUserInfo(info.doc)
      }

      return setUserInfo(null)
    },
    [address],
  )

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
