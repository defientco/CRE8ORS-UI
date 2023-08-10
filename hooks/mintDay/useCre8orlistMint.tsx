import { Contract } from "ethers"
import { useAccount } from "wagmi"
import cre8orlistMinterAbi from "../../lib/abi-cre8orlist-minter.json"
import getCartPrice from "../../lib/getCartPrice"
import { useEthersSigner } from "../useEthersSigner"
import createMerkleProof from "../../lib/merkle/createMerkleProof"

const useCre8orlistMint = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
  const { address } = useAccount()

  const mint = async (cart) => {
    console.log("SWEETS SIGNER", signer)
    const { proof } = createMerkleProof(address)
    const value = await getCartPrice(cart)
    const contract = new Contract(
      process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS,
      cre8orlistMinterAbi,
      signer,
    )

    const tx = await contract.mintPfp(address, cart, proof || [], { value })
    await tx.wait()
  }

  return {
    mint,
  }
}
export default useCre8orlistMint
