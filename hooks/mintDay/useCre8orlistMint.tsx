import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"
import minterUtilityAbi from "../../lib/abi-minter-utilities.json"
import cre8orlistMinterAbi from "../../lib/abi-cre8orlist-minter.json"
import generateMerkleProof from "../../lib/merkle/generateMerkleProof"

const useCre8orlistMint = () => {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const getPrice = async (cart: any) => {
    const contract = new Contract(process.env.NEXT_PUBLIC_MINTER_UTILITY, minterUtilityAbi, signer)
    const cost = await contract.calculateTotalCost(cart)
    return cost.toString()
  }

  const mint = async (cart) => {
    const proof = generateMerkleProof(address)
    const value = await getPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS,
      cre8orlistMinterAbi,
      signer,
    )
    const tx = await contract.mintPfp(
      address,
      cart,
      process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
      proof,
      { value },
    )
    await tx.wait()
  }

  return {
    mint,
  }
}
export default useCre8orlistMint
