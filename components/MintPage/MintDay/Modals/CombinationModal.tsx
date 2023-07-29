import { FC } from "react"
import { Button } from "../../../../shared/Button"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import IMintModal from "./IMintModal"

interface CombinationModalModalProps extends IMintModal {
  freeMintCount: number | null
}

const CombinationModal: FC<CombinationModalModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  coreMintFunc,
  handleLoading,
  handleRefetch,
  loading,
  freeMintCount,
  checkNetwork,
}) => {
  const handleMint = async () => {
    if (!checkNetwork()) return
    handleLoading(true)
    await coreMintFunc()
    await handleRefetch()
    handleLoading(false)
  }

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className="px-14 py-8 samsungS8:px-20 samsungS8:py-10 rounded-lg
                      flex-col flex justify-center items-center
                      bg-[url('/assets/Mint/MintNow/MintCoreModal/combination_bg.png')]
                      bg-cover bg-black dark:bg-white 
                      xl:w-[803px] xl:h-[569px]"
      >
        {loading ? (
          <MintLoading />
        ) : (
          <>
            <pre
              className="font-eigerdals 
                      text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[65px] 
                      uppercase text-center
                      leading-[103.3%] dark:text-black text-white"
            >
              {`You have ${freeMintCount || 0}\nfree mint${freeMintCount > 1 ? 's' : ''}`}
            </pre>

            <pre
              className="font-quicksand 
                      text-[15px] xl:text-[32px]
                      text-center 
                      pt-0 xl:pb-[50px]
                      samsungS8:pb-[15px]
                      pb-[10px]
                      dark:text-black text-white"
            >
              (with 8-week lockup)
            </pre>

            <Button
              id="mint_now"
              className="xl:!w-[348px] xl:!h-[107px] 
                      !w-[150px] !h-[50px]
                      !font-eigerdals font-bold !bg-black 
                      text-[15px] xl:text-[44px] 
                      !rounded-[10px]
                      !text-black dark:!text-white
                      dark:!bg-black !bg-white"
              onClick={handleMint}
            >
              Mint Now
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CombinationModal
