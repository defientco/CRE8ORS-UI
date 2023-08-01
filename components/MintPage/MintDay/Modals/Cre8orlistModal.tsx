import { useEffect } from "react"
import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import { useMintProvider } from "../../../../providers/MintProvider"
import abi from "../../../../lib/abi-cre8orlist-minter.json"
import minterUtilityAbi from "../../../../lib/abi-minter-utilities.json"
import handleTxError from "../../../../lib/handleTxError"
import generateMerkleProof from "../../../../lib/merkle/generateMerkleProof"

const Cre8orlistModal = ({ isModalVisible, toggleIsVisible, handleLoading, openSuccessModal }) => {
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { checkNetwork, refetchInformation, cart } = useMintProvider()

  const getPrice = async () => {
    const contract = new Contract(process.env.NEXT_PUBLIC_MINTER_UTILITY, minterUtilityAbi, signer)
    const cost = await contract.calculateTotalCost(cart)
    return cost.toString()
  }

  useEffect(() => {
    const handleMint = async () => {
      if (!checkNetwork()) return
      handleLoading(true)
      try {
        const proof = generateMerkleProof(address)
        const value = await getPrice()
        console.log("SWEETS PRICE", value)
        const contract = new Contract(process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS, abi, signer)
        const tx = await contract.mintPfp(
          address,
          cart,
          process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
          process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
          proof,
          { value },
        )
        await tx.wait()
        await refetchInformation()
        openSuccessModal()
        handleLoading(false)
      } catch (err) {
        handleTxError(err)
      }
    }

    if (!isModalVisible) return
    handleMint()
  }, [isModalVisible])

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className="px-14 py-8 samsungS8:px-20 samsungS8:py-10 rounded-lg
                      flex-col flex justify-center items-center
                      bg-[url('/assets/Mint/MintNow/MintCoreModal/combination_bg.png')]
                      bg-cover bg-black dark:bg-white 
                      xl:w-[803px] xl:h-[569px]"
      >
        <MintLoading />
      </div>
    </Modal>
  )
}

export default Cre8orlistModal
