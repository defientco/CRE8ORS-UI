import { useMemo } from "react"
import { Contract } from "ethers"
import { baseGoerli } from "@wagmi/core/chains"
import abi from "../../lib/abi-ERC6551-account-v3.json"
import { Button } from "../../shared/Button"
import { useEthersSigner } from "../../hooks/useEthersSigner"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import getDepositTransactionData from "./getDepositTransactionData"
import handleTxError from "../../lib/handleTxError"
import { useV3Provider } from "../../providers/V3Provider"
import isDeployedContract from "../../lib/isDeployedContract"
import getOptimismPortalAddress from "../../lib/getOprimismPortalAddress"
import getImplementationAddress from "../../lib/getImplementationAddress"
import { ACCOUNT_IMPLEMENTATION_V3 } from "../../helpers/constants"

const ZoraV3PrototypeButton = () => {
  const { cre8or, createAccount, initialize, isRegistered, tbaAddress } = useV3Provider()
  const layer2Network = baseGoerli
  const OP_PORTAL_PROXY_ADDRESS = getOptimismPortalAddress(layer2Network.id)
  const signer = useEthersSigner()
  const tbaContract = useMemo(() => new Contract(tbaAddress, abi, signer), [signer, tbaAddress])
  const { checkNetwork } = useCheckNetwork()

  const handleClick = async () => {
    if (!tbaAddress) return

    try {
      console.log("SWEETS isRegistered goerli", isRegistered)
      if (!isRegistered) {
        if (!checkNetwork()) return
        const response = await createAccount(cre8or.tokenId)
        if (!response) return
      }
      const isDeployedOnBase = await isDeployedContract(tbaAddress, layer2Network.id)
      console.log("SWEETS isDeployedOnBase", isDeployedOnBase)
      let isInitialized
      if (!isDeployedOnBase) {
        if (!checkNetwork(layer2Network.id)) return
        const response = await createAccount(cre8or.tokenId)
        if (!response) return
      }

      isInitialized = await getImplementationAddress(tbaAddress, layer2Network.id)
      console.log("SWEETS LAYER2 isInitialized", isInitialized)
      if (!isInitialized) {
        if (!checkNetwork(layer2Network.id)) return
        const response = await initialize()
        if (!response) return
      }

      if (!checkNetwork()) return
      isInitialized = await getImplementationAddress(tbaAddress)
      console.log("SWEETS isInitialized", isInitialized)
      if (!isInitialized) {
        const initTx = await tbaContract.initialize(ACCOUNT_IMPLEMENTATION_V3)
        await initTx.wait()
      }
      isInitialized = await getImplementationAddress(tbaAddress)
      console.log("SWEETS isInitialized", isInitialized)

      const data = getDepositTransactionData(tbaAddress)
      const operation = 0
      const tx = await tbaContract.execute(OP_PORTAL_PROXY_ADDRESS, 0, data, operation)
      await tx.wait()
    } catch (err) {
      handleTxError(err)
    }
  }

  return (
    <Button id="zora" disabled={!tbaAddress} onClick={handleClick} className="w-[777px]">
      click me for v3
    </Button>
  )
}

export default ZoraV3PrototypeButton
