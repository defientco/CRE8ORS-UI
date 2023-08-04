import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"
import minterUtilityAbi from "../../lib/abi-minter-utilities.json"
import publicMinterAbi from "../../lib/abi-public-minter.json"

const usePublicMint = () => {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const getPrice = async (cart: any) => {
    const contract = new Contract(process.env.NEXT_PUBLIC_MINTER_UTILITY, minterUtilityAbi, signer)
    const cost = await contract.calculateTotalCost(cart)
    return cost.toString()
  }

  const mint = async (cart) => {
    const value = await getPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_GENERAL_PUBLIC_MINTER_ADDRESS,
      publicMinterAbi,
      signer,
    )
    const tx = await contract.mintPfp(
      address,
      cart,
      process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
      { value },
    )
    await tx.wait()
  }

  return {
    mint,
  }
}
export default usePublicMint
