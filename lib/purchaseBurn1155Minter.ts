import { Contract, Signer } from "ethers"
import { toast } from "react-toastify"
import handleTxError from "./handleTxError"
import abi from "./abi/burn1155minter.json"

const BURN_1155_MINTER = "0x6D6dBc5C0F96aAAcF45F6E11C4d0a829a8f369a9"

const purchaseBurn1155Minter = async (
  contractAddress: string,
  signer: Signer,
  onSuccess: any,
  setIsProcessing?: (state: boolean) => void,
) => {
  try {
    setIsProcessing(true)
    const contract = new Contract(BURN_1155_MINTER, abi, signer)
    const tx = await contract.purchase(contractAddress, 1)
    await tx.wait()
    toast.success("Successfully minted")
    onSuccess()
  } catch (err) {
    handleTxError(err)
  }
  setIsProcessing(false)
}

export default purchaseBurn1155Minter
