import { Contract } from "ethers"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useEthersSigner } from "../useEthersSigner"
import handleTxError from "../../lib/handleTxError"
import { useMintProvider } from "../../providers/MintProvider"
import useCheckNetwork from "../useCheckNetwork"

const useCre8orMintV2 = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
  const { publicSalePrice } = useMintProvider()
  const { checkNetwork } = useCheckNetwork()

  const mint = async (quantity) => {
    try {
      if (!signer) {
        throw new Error("Please, connect your wallet")
      }
      if (!checkNetwork()) {
        throw new Error("switch your network")
      }

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
