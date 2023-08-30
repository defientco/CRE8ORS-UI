import { Contract } from "ethers"
import { useEthersSigner } from "./useEthersSigner"
import handleTxError from "../lib/handleTxError"
import cre8orAbi from "../lib/abi-cre8ors.json"

const useERC721Transfer = () => {
  const signer = useEthersSigner()

  const transferERC721 = async (
    erc721Address: string,
    from: string,
    to: string,
    tokenId: number,
    afterTransfer: Function,
  ) => {
    if (!signer) return { err: "missing signer" }
    try {
      const contract = new Contract(erc721Address, cre8orAbi, signer)
      const tx = await contract.transferFrom(from, to, tokenId)
      const receipt = await tx.wait()
      await afterTransfer()
      return receipt
    } catch (err) {
      handleTxError(err)
      return { err }
    }
  }

  return {
    transferERC721,
  }
}

export default useERC721Transfer
