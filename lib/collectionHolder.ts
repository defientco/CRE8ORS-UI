import { ethers, Signer } from "ethers"
import friendAndFamilyAbi from "./abi-friend-family.json"
import collectionHolderAbi from "./abi-collection-holder.json"
import getDefaultProvider from "./getDefaultProvider"
import handleTxError from "./handleTxError"

export const freeMint = async (signer: Signer) => {
  const address = await signer.getAddress()

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRES,
    friendAndFamilyAbi,
    signer,
  )

  try {
    const tx = await contract.mint(address)
    await tx.wait()

    return true
  } catch (err) {
    handleTxError(err)
    return false
  }
}

export const checkFreeMint = async (address: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    collectionHolderAbi,
    provider,
  )
  try {
    const passportBalance = await contract.freeMintClaimed(address)
    return parseInt(passportBalance.toString(), 10) > 0
  } catch (err) {
    handleTxError(err)
    return false
  }
}
