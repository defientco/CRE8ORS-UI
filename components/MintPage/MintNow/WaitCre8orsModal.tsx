import { FC } from "react"
import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import Modal from "../../../shared/Modal"
import ModalTimer from "./ModalTimer"
import { Button } from "../../../shared/Button"

interface DetectedPassportModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
  hasAllowListRole: boolean
  isCre8orsDay: boolean
}

const WaitCre8orsModal: FC<DetectedPassportModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  hasAllowListRole,
  isCre8orsDay,
}) => {
  const [modalRef, { width }] = useMeasure()
  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className={`p-2 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
                flex-col flex justify-center items-center
                ${
                  hasAllowListRole
                    ? "bg-[url('/assets/Mint/MintNow/MintCoreModal/allowlist_bg.png')]"
                    : "bg-[url('/assets/Mint/MintNow/MintCoreModal/notallowlist_bg.png')]"
                }
                bg-cover`}
        ref={modalRef}
        style={{
          width: isXl ? "100%" : "803px",
          height: isXl
            ? `${(width / 803) * (!hasAllowListRole && isCre8orsDay ? 794 : 633)}px`
            : `${!hasAllowListRole && isCre8orsDay ? "794px" : "633px"}`,
        }}
      >
        <pre
          className="font-eigerdals 
                text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[55px] 
                uppercase text-center
                leading-[103.3%]"
        >
          {hasAllowListRole ? `You're on\nthe cre8ors list.` : `You're not on\nthe cre8ors list.`}
        </pre>
        <pre
          className="font-quicksand font-bold
                text-[15px] xl:text-[42px]
                text-center 
                uppercase underline
                xl:pt-[75px] xl:pb-[35px]
                samsungS8:pt-[8px] samsungS8:pb-[15px]
                pt-[5px] pb-[10px]"
        >
          Mint starts in:
        </pre>
        <ModalTimer endDay="09 Aug 2023 08:00:00 UTC" />
        {!hasAllowListRole && isCre8orsDay && (
          <Button
            id="mint_now"
            className="xl:!w-[461px] xl:!h-[107px] 
                mt-[10px] xl:mt-[87px]
                !w-[230px] !h-[50px]
                !font-eigerdals font-bold !bg-black 
                text-[15px] xl:text-[34px] 
                !rounded-[10px]
                !text-white"
          >
            Take Allowlist Quiz
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default WaitCre8orsModal
