/* eslint-disable no-plusplus */
import { Signer, ethers } from "ethers"
import getNFTs from "./alchemy/getNFTs"
import handleTxError from "./handleTxError"
import { getIsLocked } from "./lockup"
import cre8orAbi from "./abi-cre8ors.json"

export const getCre8ors = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getLockedCount = async (address: string) => {
  const response = await getCre8ors(address)
  let count: number = 0
  for (let i = 0; i < response.length; i++) {
    if (response[i]?.id?.tokenId) {
      // eslint-disable-next-line no-await-in-loop
      const isLocked = await getIsLocked(response[i]?.id?.tokenId)
      if (isLocked) count++
    }
  }

  return count
}

export const transferCre8orToSmartWallet = async (
  contractAddress: string,
  from: string,
  to: string,
  tokenId: number,
  signer: Signer,
) => {
  try {
    const contract = new ethers.Contract(contractAddress, cre8orAbi, signer)
    const tx = await contract.transferFrom(from, to, tokenId)
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { err }
  }
}
