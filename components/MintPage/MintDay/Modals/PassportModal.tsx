import { FC } from "react"
import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "../../../../shared/Button"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"

interface PassportModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
  mintCre8or: () => void
  loading: boolean
}

const PassportModal: FC<PassportModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  mintCre8or,
  loading,
}) => {
  const [modalRef, { width }] = useMeasure()
  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className="p-8 xl:p-4 rounded-lg
                flex-col flex justify-center items-center
                bg-[url('/assets/Mint/MintNow/MintCoreModal/passport_bg.png')]
                bg-cover bg-black dark:bg-white"
        ref={modalRef}
        style={{
          width: isXl ? "100%" : "803px",
          height: isXl ? `${(width / 803) * 569}px` : "569px",
        }}
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
              {`Passport detected:\n1 Free Mint!`}
            </pre>

            <pre
              className="font-quicksand 
                text-[15px] xl:text-[32px]
                text-center 
                xl:pt-[23px] xl:pb-[50px]
                samsungS8:pt-[8px] samsungS8:pb-[15px]
                pt-[5px] pb-[10px]
                dark:text-black text-white"
            >
              (with 8-month lockup)
            </pre>

            <Button
              id="mint_now"
              className="xl:!w-[348px] xl:!h-[107px] 
                !w-[150px] !h-[50px]
                !font-eigerdals font-bold !bg-black 
                text-[15px] xl:text-[44px] 
                !rounded-[10px]
                text-black dark:!text-white
                dark:!bg-black !bg-white"
              onClick={mintCre8or}
            >
              Mint Now
            </Button>
          </>
        )}
      </div>
    </Modal>
  )
}

export default PassportModal
