import { ethers } from "ethers"
import lockupAbi from "./abi-lockup.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const getIsLocked = async (tokenId: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    lockupAbi,
    provider,
  )

  try {
    const isLocked = await contract.isLocked(
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      parseInt(tokenId, 10),
    )

    return isLocked
  } catch (err) {
    handleTxError(err)
    return false
  }
}
