import { ethers } from "ethers"
import collectiveAbi from "./abi-collective.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const checkPassport = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_PASS_ADDRESS,
    collectiveAbi,
    provider,
  )
  try {
    const passportBalance = await contract.balanceOf(address)
    return parseInt(passportBalance.toString(), 10) > 0
  } catch (err) {
    handleTxError(err)
    return false
  }
}
