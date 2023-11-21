import { useEffect, useMemo, useState } from "react"
import { Contract } from "ethers"
import getSmartWalletV3 from "../lib/getSmartWalletV3"
import isDeployedContract from "../lib/isDeployedContract"
import registryAbi from "../lib/abi-ERC6551-registry-v3.json"
import accountAbi from "../lib/abi-ERC6551-account-v3.json"
import {
  ACCOUNT_IMPLEMENTATION_V3,
  ACCOUNT_PROXY_V3,
  CHAIN_ID,
  REGISTRY_ADDRESS_V3,
  SALT_V3,
} from "../helpers/constants"
import { useEthersSigner } from "./useEthersSigner"
import handleTxError from "../lib/handleTxError"

const useSmartWalletV3 = (cre8orNumber) => {
  const [tbaAddress, setTbaAddress] = useState("")
  const [isRegistered, setIsRegistered] = useState(null)
  const signer = useEthersSigner()
  const registryContract = useMemo(
    () => new Contract(REGISTRY_ADDRESS_V3, registryAbi, signer),
    [signer],
  )
  const tbaContract = useMemo(
    () => tbaAddress && new Contract(tbaAddress, accountAbi, signer),
    [tbaAddress, signer],
  )

  useEffect(() => {
    const init = async () => {
      let response = await getSmartWalletV3(cre8orNumber)
      setTbaAddress(response)
      response = await isDeployedContract(response)
      setIsRegistered(response)
    }
    if (!cre8orNumber) {
      setTbaAddress("")
      return
    }
    init()
  }, [cre8orNumber])

  const createAccount = async (tokenId) => {
    try {
      const tx = await registryContract.createAccount(
        ACCOUNT_PROXY_V3,
        SALT_V3,
        CHAIN_ID,
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        tokenId,
      )
      const response = await tx.wait()
      return response
    } catch (err) {
      handleTxError(err)
      return false
    }
  }

  const initialize = async () => {
    try {
      const tx = await tbaContract.initialize(ACCOUNT_IMPLEMENTATION_V3)
      const response = await tx.wait()
      return response
    } catch (e) {
      handleTxError(e)
      return false
    }
  }

  return { createAccount, initialize, isRegistered, tbaAddress }
}

export default useSmartWalletV3
