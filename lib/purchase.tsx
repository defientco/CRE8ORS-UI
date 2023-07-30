import { ContractInterface, ethers, Signer } from "ethers"
import { parseEther } from "ethers/lib/utils.js"
import minterUtility from "./abi-minter-utilities.json"
import handleTxError from "./handleTxError"

const purchase = async (
  contractAddress: string,
  signer: Signer,
  abi: ContractInterface,
  params?: any,
) => {
  const minterUtilityContract = new ethers.Contract(
    process.env.NEXT_PUBLIC_MINTER_UTILITY,
    minterUtility,
    signer,
  )
  const contract = new ethers.Contract(contractAddress, abi, signer)
  const { address, cart, passportHolderMinterAddress, familyAndFriendsMinterAddress } = params
  const totalCost = await minterUtilityContract.calculateTotalCost(cart)
  console.log("totalCost", parseInt(totalCost._hex, 16))
  try {
    const tx = await contract.mintPfp(
      address,
      cart,
      passportHolderMinterAddress,
      familyAndFriendsMinterAddress,
      {
        value: totalCost,
      },
    )
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default purchase
