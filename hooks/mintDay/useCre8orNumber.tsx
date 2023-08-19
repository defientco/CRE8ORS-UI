import { useCallback, useState, useEffect } from "react"
import getNFTs from "../../lib/alchemy/getNFTs"
import { useAccount } from "wagmi"
import { BigNumber } from "ethers"

const useCre8orNumber = () => {
  const [cre8orNumber, setCre8orNumber] = useState("")
  const { address } = useAccount()

  const getCre8orNumber = useCallback(async () => {
    if (!address) return null

    const response = await getNFTs(
      address as string,
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
    )

    if (response?.ownedNfts.length) {
      const lastCre8or = response.ownedNfts[response.totalCount - 1]
      const tokenId = BigNumber.from(lastCre8or.id.tokenId).toString()
      return setCre8orNumber(tokenId)
    }

    return setCre8orNumber("")
  }, [address])

  useEffect(() => {
    getCre8orNumber()
  }, [getCre8orNumber])

  return {
    getCre8orNumber,
    cre8orNumber,
  }
}

export default useCre8orNumber
