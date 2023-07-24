import { ContractInterface, ethers } from "ethers"

import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

const checkPassport = async (address: string, abi: ContractInterface) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_PASS_ADDRESS, abi, provider)
  try {
    const passportBalance = await contract.balanceOf(address)
    return parseInt(passportBalance.toString(), 10) > 0
  } catch (err) {
    handleTxError(err)
    return false
  }
}

export default checkPassport
