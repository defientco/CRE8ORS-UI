import { FC } from "react"
import DetectedPassportModal from "./DetectedPassportModal"
import WaitCre8orsModal from "./WaitCre8orsModal"
import MintMoreModal from "./MintMoreModal"

interface MintCoreModalProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const MintCoreModal: FC<MintCoreModalProps> = ({ isVisibleModal, toggleModal }) => {
  const maxOfNFTs = 4

  const hasPassport = false

  const allowedAtList = true

  // const isPublicDay = new Date().getTime() >= new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const countOfNFT = 2

  return (
    <>
      {!countOfNFT &&
        (hasPassport ? (
          <DetectedPassportModal isModalVisible={isVisibleModal} toggleIsVisible={toggleModal} />
        ) : (
          <WaitCre8orsModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            hasAllowListRole={allowedAtList}
            isCre8orsDay={isCre8orlistDay}
          />
        ))}

      {countOfNFT && (
        <MintMoreModal
          possibleMintCount={maxOfNFTs - countOfNFT}
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
        />
      )}
    </>
  )
}

export default MintCoreModal
