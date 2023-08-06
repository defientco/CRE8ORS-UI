import { FC, useMemo } from "react"
import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import ModalTimer from "../ModalTimer"
import Modal from "../../../../shared/Modal"
import { Button } from "../../../../shared/Button"
import { useMintProvider } from "../../../../providers/MintProvider"
import { isWhitelisted, hasMerkleProof } from "../../../../lib/merkle/isWhitelisted"
import epochToModalTimerString from "../../../../lib/epochToModalTimerString"

interface DetectedPassportModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}

const WaitCre8orsModal: FC<DetectedPassportModalProps> = ({ isModalVisible, toggleIsVisible }) => {
  const { address } = useAccount()
  const [modalRef, { width }] = useMeasure()
  const isXl = useMediaQuery("(max-width: 1150px)")
  const { presaleActive, presaleStart, publicSaleStart, loadingSaleStatus, merkleRoot } =
    useMintProvider()
  const whitelisted = useMemo(async () => {
    let hasProof = false
    if (merkleRoot.length > 0) {
      hasProof = await hasMerkleProof(address, merkleRoot)
    }
    return isWhitelisted(address) || hasProof
  }, [address, merkleRoot])
  const endDay = epochToModalTimerString(whitelisted ? presaleStart : publicSaleStart)
  const notWhitelistPresaleActive = !whitelisted && presaleActive

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className={`p-2 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
                flex-col flex justify-center items-center
                ${
                  whitelisted
                    ? "bg-[url('/assets/Mint/MintNow/MintCoreModal/allowlist_bg.png')]"
                    : "bg-[url('/assets/Mint/MintNow/MintCoreModal/notallowlist_bg.png')]"
                }
                bg-cover`}
        ref={modalRef}
        style={{
          width: isXl ? "100%" : "803px",
          height: isXl
            ? `${(width / 803) * (notWhitelistPresaleActive ? 794 : 633)}px`
            : `${notWhitelistPresaleActive ? "700px" : "633px"}`,
        }}
      >
        <pre
          className="font-eigerdals 
                text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[55px] 
                uppercase text-center
                leading-[103.3%]"
        >
          {whitelisted ? `You're on\nthe cre8ors list.` : `You're not on\nthe cre8ors list.`}
        </pre>
        <pre
          className="font-quicksand font-bold
                text-[15px] xl:text-[42px]
                text-center 
                uppercase underline
                xl:pt-[35px] xl:pb-[35px]
                samsungS8:pt-[8px] samsungS8:pb-[15px]
                pt-[5px] pb-[10px]"
        >
          Mint starts in:
        </pre>
        {!loadingSaleStatus && <ModalTimer endDay={endDay} />}
        {notWhitelistPresaleActive && (
          <Button
            id="mint_now"
            className="xl:!w-[461px] xl:!h-[107px] 
                mt-[10px] xl:mt-[40px]
                !w-[230px] !h-[50px]
                !font-eigerdals font-bold !bg-black 
                text-[15px] xl:text-[34px] 
                !rounded-[10px]
                !text-white"
            onClick={() => {
              window.open("https://everythingcorp.cre8ors.com/quiz", "_blank")
              toggleIsVisible()
            }}
          >
            Take Allowlist Quiz
          </Button>
        )}
      </div>
    </Modal>
  )
}

export default WaitCre8orsModal
