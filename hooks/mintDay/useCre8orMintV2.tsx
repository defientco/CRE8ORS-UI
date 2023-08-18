import { Contract } from "ethers"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useEthersSigner } from "../useEthersSigner"
import handleTxError from "../../lib/handleTxError"
import { useMintProvider } from "../../providers/MintProvider"

const useCre8orMintV2 = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
  const { publicSalePrice } = useMintProvider()
  console.log("sweets publicSalePrice", publicSalePrice)
  const mint = async (quantity) => {
    try {
      const contract = new Contract(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, cre8orAbi, signer)

      const tx = await contract.purchase(quantity, {
        value: publicSalePrice,
        gasLimit: 300293 * quantity,
      })
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
