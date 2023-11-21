import { useMemo } from "react"
import { Contract } from "ethers"
import abi from "../../lib/abi-ERC6551-account-v3.json"
import { Button } from "../../shared/Button"
import { useEthersSigner } from "../../hooks/useEthersSigner"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import getDepositTransactionData from "./getDepositTransactionData"
import handleTxError from "../../lib/handleTxError"

const ZoraV3PrototypeButton = () => {
  const mySmartWallet = "0xdA88a6f8Cb3a278c1cfd6a988077435ACcbbF43C"
  const OP_PORTAL_PROXY_ADDRESS = "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383"
  const signer = useEthersSigner()
  const tbaContract = useMemo(() => new Contract(mySmartWallet, abi, signer), [signer])
  const { checkNetwork } = useCheckNetwork()
  const handleClick = async () => {
    if (!checkNetwork()) return

    const data = getDepositTransactionData(mySmartWallet)
    const operation = 0
    try {
      const tx = await tbaContract.execute(OP_PORTAL_PROXY_ADDRESS, 0, data, operation)
      await tx.wait()
    } catch (err) {
      handleTxError(err)
    }
  }

  return (
    <Button id="zora" onClick={handleClick} className="w-[777px] bg-white text-black">
      click me for v3
    </Button>
  )
}

export default ZoraV3PrototypeButton
