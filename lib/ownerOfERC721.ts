import { ethers } from "ethers"
import abi from "./abi-cre8ors.json"
import getDefaultProvider from "./getDefaultProvider"

const ownerOfERC721 = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, abi, provider)

  try {
    const response = await contract.ownerOf(address)
    return response
  } catch (err) {
    return { error: err }
  }
}

export default ownerOfERC721
