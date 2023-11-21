import { toast } from "react-toastify"
import { useNetwork, useSwitchNetwork } from "wagmi"
import { useCallback } from "react"
import { CHAIN_ID } from "../helpers/constants"

function useCheckNetwork() {
  const { chains, chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const checkNetwork = useCallback(
    (chainId = CHAIN_ID) => {
      if (activeChain?.id !== chainId) {
        switchNetwork(chainId)
        const myChain = chains.find((blockchain) => blockchain.id === chainId)
        toast.error(`Please connect to ${myChain.name} and try again`)

        return false
      }

      return true
    },
    [switchNetwork, activeChain],
  )

  return {
    checkNetwork,
  }
}

export default useCheckNetwork
