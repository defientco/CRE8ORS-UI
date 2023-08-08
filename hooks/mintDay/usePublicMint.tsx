import { Contract } from "ethers"
import { useAccount } from "wagmi"
import publicMinterAbi from "../../lib/abi-public-minter.json"
import getCartPrice from "../../lib/getCartPrice"
import { useEthersSigner } from "../useEthersSigner"

const usePublicMint = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
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
