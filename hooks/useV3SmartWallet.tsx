import { useEffect, useState } from "react"
import getSmartWalletV3 from "../lib/getSmartWalletV3"

const useSmartWalletV3 = (cre8orNumber) => {
  const [tbaAddress, setTbaAddress] = useState("")

  useEffect(() => {
    const init = async () => {
      const response = await getSmartWalletV3(cre8orNumber)
      setTbaAddress(response)
    }
    if (!cre8orNumber) {
      setTbaAddress("")
      return
    }
    init()
  }, [cre8orNumber])

  return { tbaAddress }
}

export default useSmartWalletV3
