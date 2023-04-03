import { Contract, Signer } from "ethers"
import { toast } from "react-toastify"
import handleTxError from "./handleTxError"
import abi from "./abi/burn721minter.json"

const BURN_721_MINTER = "0x8827c1A20B0080126D9274c9Deb604fB908020d1"

const purchaseBurn721Minter = async (
  contractAddress: string,
  quantity: number,
  tokensToBurn: number[],
  signer: Signer,
  onSuccess: any,
  setIsProcessing?: (state: boolean) => void,
) => {
  try {
    console.log("BURNING", tokensToBurn)
    setIsProcessing(true)
    const contract = new Contract(BURN_721_MINTER, abi, signer)
    const tx = await contract.purchase(contractAddress, quantity, tokensToBurn)
    await tx.wait()
    toast.success("Successfully minted")
    onSuccess()
  } catch (err) {
    handleTxError(err)
  }
  setIsProcessing(false)
}

export default purchaseBurn721Minter
