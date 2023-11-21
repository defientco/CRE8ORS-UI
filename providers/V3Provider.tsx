import { useContext, createContext, useState, useMemo } from "react"
import useSmartWalletV3 from "../hooks/useV3SmartWallet"

const V3Context = createContext<any>(null)

export const V3Provider = ({ children }) => {
  const [cre8or, setCre8or] = useState(null)
  const smartWallet = useSmartWalletV3(cre8or?.tokenId)

  const provider = useMemo(
    () => ({
      setCre8or,
      cre8or,
      ...smartWallet,
    }),
    [setCre8or, cre8or, smartWallet],
  )

  return <V3Context.Provider value={provider}>{children}</V3Context.Provider>
}

export const useV3Provider = () => useContext(V3Context)
