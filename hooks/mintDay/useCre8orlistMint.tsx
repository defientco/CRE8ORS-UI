import { Contract } from "ethers"
import { useAccount } from "wagmi"
import axios from "axios"
import cre8orlistMinterAbi from "../../lib/abi-cre8orlist-minter.json"
import getCartPrice from "../../lib/getCartPrice"
import { useEthersSigner } from "../useEthersSigner"
import { useMintProvider } from "../../providers/MintProvider"

const useCre8orlistMint = () => {
  const signer = useEthersSigner()
  const { merkleRoot } = useMintProvider()
  const { address } = useAccount()

  const mint = async (cart) => {
    const params = {
      root: merkleRoot,
      walletAddress: address,
    }
    const response = await axios.get(`/api/v2/get/merkle`, { params })
    // if (!response.data.success) throw new Error("Merkle proof not found")
    const { proof } = response.data
    const value = await getCartPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS,
      cre8orlistMinterAbi,
      signer,
    )

    console.log("SWEETS PROOF ", proof || [])
    const tx = await contract.mintPfp(address, cart, proof || [], { value })
    await tx.wait()
  }

  return {
    mint,
  }
}
export default useCre8orlistMint
