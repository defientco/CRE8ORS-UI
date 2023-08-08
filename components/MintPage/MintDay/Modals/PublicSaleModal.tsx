import { useEffect } from "react"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import { useMintProvider } from "../../../../providers/MintProvider"
import handleTxError from "../../../../lib/handleTxError"
import usePublicMint from "../../../../hooks/mintDay/usePublicMint"

const PublicSaleModal = ({ isModalVisible, toggleIsVisible, handleLoading, openSuccessModal }) => {
  const { checkNetwork, refetchInformation, cart } = useMintProvider()
  const { mint } = usePublicMint()

  useEffect(() => {
    const handleMint = async () => {
      if (!checkNetwork()) return
      handleLoading(true)
      try {
        await mint(cart)
        openSuccessModal()
        await refetchInformation()
        handleLoading(false)
      } catch (err) {
        handleTxError(err)
        toggleIsVisible()
      }
    }

    if (!isModalVisible) return
    handleMint()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default PublicSaleModal
