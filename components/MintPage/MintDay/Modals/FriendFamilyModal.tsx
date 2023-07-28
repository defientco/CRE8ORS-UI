import { FC } from "react"
import { Button } from "../../../../shared/Button"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import IMintModal from "./IMintModal"

interface FriendFamilyModalProps extends IMintModal {}

const FriendFamilyModal: FC<FriendFamilyModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  loading,
  handleLoading,
  coreMintFunc,
  checkNetwork,
  handleRefetch,
}) => {
  const handleClick = async () => {
    if (!checkNetwork()) return
    handleLoading(true)
    await coreMintFunc()
    handleLoading(false)

    await handleRefetch()
  }

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className="p-8 xl:p-14 rounded-lg
                  flex-col flex justify-center items-center
                  bg-[url('/assets/Mint/MintNow/MintCoreModal/friend_family.png')]
                  bg-cover bg-black dark:bg-white"
      >
        {loading ? (
          <MintLoading />
        ) : (
          <>
            <pre
              className="font-eigerdals 
                  text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[55px] 
                  uppercase text-center
                  leading-[103.3%] dark:text-black text-white"
            >
              {`Friends and family\ndetected:\n\n1 Free Mint!`}
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
              onClick={handleClick}
            >
              Mint Now
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default FriendFamilyModal