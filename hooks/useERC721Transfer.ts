import { useCallback } from "react"
import { transferFromERC721 } from "../lib/cre8or"
import { useEthersSigner } from "./useEthersSigner"

const useERC721Transfer = ({ afterTransfer }) => {
  const signer = useEthersSigner()

  const transferERC721 = useCallback(
    async (erc721Address: string, from: string, to: string, tokenId: number) => {
      if (!signer) return

      const response = await transferFromERC721(erc721Address, from, to, tokenId, signer)

      if (!response?.err) {
        await afterTransfer()
      }
    },
    [signer, afterTransfer],
  )

  return {
    transferERC721,
  }
}

export default useERC721Transfer
