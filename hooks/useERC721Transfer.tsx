import { Contract } from "ethers"
import { useEthersSigner } from "./useEthersSigner"
import handleTxError from "../lib/handleTxError"
import cre8orAbi from "../lib/abi-cre8ors.json"
import erc6551AccountAbi from "../lib/abi-ERC6551-account.json.json"
import { utils } from "ethers"

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

  const transferERC721FromERC6551Account = async (
    tokenBoundAccount: string,
    erc721Address: string,
    from: string,
    to: string,
    tokenId: number,
    afterTransfer: Function,
  ) => {
    if (!signer) return { err: "missing signer" }
    try {
      const abi = ["function transferFrom(address from, address to, uint256 tokenId)"]

      const contract = new Contract(tokenBoundAccount, erc6551AccountAbi, signer)
      const iface = new utils.Interface(abi)
      const data = iface.encodeFunctionData("transferFrom", [from, to, tokenId])

      const tx = await contract.executeCall(erc721Address, 0, data)

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
    transferERC721FromERC6551Account,
  }
}

export default useERC721Transfer
