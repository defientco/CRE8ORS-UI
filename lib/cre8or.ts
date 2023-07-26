import { Signer, ethers } from "ethers"
import cre8orAbi from "./abi-cre8ors.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"
import getNFTs from "./alchemy/getNFTs"

export const getCre8ors = async (address: string) => {
    const res = await getNFTs(
      address,
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
    )
    return res?.ownedNfts
  }
  
  export const getLastPassportId = async (address: string) => {
    const response = await getCre8ors(address)
    const count = response?.length
    const lastPassportId = response?.pop() || null
    return { id: lastPassportId, noOfPassports: count }
  }