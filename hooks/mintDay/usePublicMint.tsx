import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"
import publicMinterAbi from "../../lib/abi-public-minter.json"
import getCartPrice from "../../lib/getCartPrice"

const usePublicMint = () => {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const mint = async (cart) => {
    const value = await getCartPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_GENERAL_PUBLIC_MINTER_ADDRESS,
      publicMinterAbi,
      signer,
    )
    const tx = await contract.mintPfp(address, cart, { value })
    await tx.wait()
  }

  return {
    mint,
  }
}
export default usePublicMint
