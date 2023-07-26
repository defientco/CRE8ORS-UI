import { Signer, ethers } from "ethers"
import collectionHolderAbi from "../abi-collection-holder.json"
import handleTxError from "../handleTxError"
import getDefaultProvider from "../getDefaultProvider"
import getNFTs from "../alchemy/getNFTs"

export const getPassports = async (address: string) => {
  const res = await getNFTs(
    address,
    process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
    process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
  )
  return res?.ownedNfts
}

export const getLastPassportId = async (address: string) => {
  const response = await getPassports(address)
  const count = response?.length
  const lastPassportId = response?.pop() || null
  return { id: lastPassportId, noOfPassports: count }
}

export const freeMintClaimed = async (passportId: number) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    provider,
  )
  try {
    const isClaimed = await contract.freeMintClaimed(passportId)

    return isClaimed
  } catch (err) {
    handleTxError(err)
    return false
  }
}

export const mintCollectionHolder = async (signer: Signer, passportId: string) => {
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    signer,
  )

  try {
    const address = await signer.getAddress()

    const tx = contract.mint(passportId, process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, address)
    const receipt = await tx.wait()

    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}
