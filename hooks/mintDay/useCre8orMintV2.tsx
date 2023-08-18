import { Contract } from "ethers"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useEthersSigner } from "../useEthersSigner"
import handleTxError from "../../lib/handleTxError"
import { ethers } from "ethers"

const useCre8orMintV2 = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })

  const mint = async (quantity) => {
    try {
      const contract = new Contract(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, cre8orAbi, signer)

      const value = ethers.utils.parseUnits(Number(0.05 * quantity).toString(), 18)

      const tx = await contract.purchase(quantity, { value, gasLimit: 300293 * quantity })
      const receipt = await tx.wait()
      return receipt
    } catch (err) {
      handleTxError(err)
      return { err }
    }
  }

  return {
    mint,
  }
}
export default useCre8orMintV2
