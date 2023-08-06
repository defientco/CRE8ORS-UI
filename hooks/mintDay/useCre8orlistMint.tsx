import { Contract } from "ethers"
import { useAccount } from "wagmi"
import axios from "axios"
import cre8orlistMinterAbi from "../../lib/abi-cre8orlist-minter.json"
import getCartPrice from "../../lib/getCartPrice"
import { useEthersSigner } from "../useEthersSigner"

const useCre8orlistMint = () => {
  const signer = useEthersSigner()
  const { address } = useAccount()

  const mint = async (cart) => {
    const response = await axios.get(`/api/merkle?address=${address}`)
    const proof = response.data
    const value = await getCartPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS,
      cre8orlistMinterAbi,
      signer,
    )

    const tx = await contract.mintPfp(address, cart, proof, { value })
    await tx.wait()
  }

  return {
    mint,
  }
}
export default useCre8orlistMint
