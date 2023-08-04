import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"
import axios from "axios"
import cre8orlistMinterAbi from "../../lib/abi-cre8orlist-minter.json"
import getCartPrice from "../../lib/getCartPrice"

const useCre8orlistMint = () => {
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const mint = async (cart) => {
    const response = await axios.get(`/api/merkle?address=${address}`)
    const proof = response.data
    console.log("SWEETS GET CART PRICE", cart)

    const value = await getCartPrice(cart)
    console.log("SWEETS CART PRICE", value)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS,
      cre8orlistMinterAbi,
      signer,
    )
    console.log("MINTING ALLOWLIST", address)
    console.log("MINTING ALLOWLIST", cart)
    console.log("MINTING ALLOWLIST", proof)
    console.log("MINTING ALLOWLIST", value)

    const tx = await contract.mintPfp(address, cart, proof, { value })
    await tx.wait()
  }

  return {
    mint,
  }
}
export default useCre8orlistMint
