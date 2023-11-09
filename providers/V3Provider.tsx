import { useContext, createContext, useState, useMemo } from "react"

const V3Context = createContext<any>(null)

export const V3Provider = ({ children }) => {
  const [cre8or, setCre8or] = useState(null)

  const provider = useMemo(
    () => ({
      setCre8or,
      cre8or,
    }),
    [setCre8or, cre8or],
  )

  return <V3Context.Provider value={provider}>{children}</V3Context.Provider>
}

export const useV3Provider = () => useContext(V3Context)
