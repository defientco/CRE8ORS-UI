import { ethers } from "ethers"
import friendAndFamilyAbi from "./abi-friend-family.json"

import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const hasDiscount = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRES,
    friendAndFamilyAbi,
    provider,
  )
  try {
    const response = await contract.hasDiscount(address)
    return response
  } catch (err) {
    handleTxError(err)
    return false
  }
}
