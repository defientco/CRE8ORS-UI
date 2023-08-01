import { useEffect } from "react"
import { Contract } from "ethers"
import { useAccount, useSigner } from "wagmi"

import { Button } from "../../../../shared/Button"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import { useMintProvider } from "../../../../providers/MintProvider"
import utilityAbi from "../../../../lib/abi-minter-utilities.json"
import abi from "../../../../lib/abi-cre8orlist-minter.json"
import handleTxError from "../../../../lib/handleTxError"
import generateMerkleProof from "../../../../lib/merkle/generateMerkleProof"

const Cre8orlistModal = ({
  isModalVisible,
  toggleIsVisible,
  handleLoading,
  openSuccessModal,
  quantities,
}) => {
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { checkNetwork, refetchInformation } = useMintProvider()

  useEffect(() => {
    const handleMint = async () => {
      console.log("SWEETS ALLOWLIST MINT", quantities)
      if (!checkNetwork()) return
      handleLoading(true)
      try {
        const cart = [{ tier: "1", quantity: "1" }]
        console.log("SWEETS cart", cart)
        console.log("SWEETS generateMerkleProof", address)

        const proof = generateMerkleProof(address)
        console.log("SWEETS MERKLE PROOF", proof)
        const contract = new Contract(process.env.NEXT_PUBLIC_ALLOWLIST_MINTER_ADDRESS, abi, signer)
        const tx = await contract.mintPfp(
          address,
          cart,
          process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
          process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
          proof,
          {
            value: 500000000000000,
          },
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
