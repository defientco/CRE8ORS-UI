import { FC, useEffect, useState } from "react"
import { useAccount } from "wagmi"

import MintMoreModal from "./MintMoreModal"
import getApplicant from "../../../../lib/getApplicant"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { useMintProvider } from "../../../../providers/MintProvider"
import CombinationModal from "./CombinationModal"
import Cre8orlistModal from "./Cre8orlistModal"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const { address } = useAccount()
  const [applicant, setApplicant] = useState({} as any)
  const { hasPassport, hasUnclaimedFreeMint, hasFriendAndFamily, leftQuantityCount, cart } =
    useMintProvider()
  const [mintLoading, setMintLoading] = useState(false)
  const [shouldOpenSuccessModal, setShouldOpenSuccessModal] = useState(false)

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const handleMintLoading = (isMintLoading: boolean) => {
    setMintLoading(isMintLoading)
  }

  const { mintCre8ors, freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay()

  useEffect(() => {
    const init = async () => {
      const response = await getApplicant(address)
      setApplicant(response)
    }
    if (!address) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  useEffect(() => {
    if (address) setShouldOpenSuccessModal(false)
  }, [address])

  const isFreeMintModal = (hasPassport && hasUnclaimedFreeMint) || hasFriendAndFamily

  const selectModal = () => {
    if (shouldOpenSuccessModal)
      return (
        <MintMoreModal
          isModalVisible={shouldOpenSuccessModal}
          toggleIsVisible={() => {
            setShouldOpenSuccessModal(!shouldOpenSuccessModal)
            if (isVisibleModal) toggleModal()
          }}
          coreMintFunc={mintCre8ors}
          loading={mintLoading}
          handleLoading={handleMintLoading}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
        />
      )
    if (isFreeMintModal)
      return (
        <CombinationModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={
            hasPassport && hasUnclaimedFreeMint ? freeMintPassportHolder : freeMintFamilyAndFriend
          }
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          loading={mintLoading}
          handleLoading={handleMintLoading}
        />
      )

    if (leftQuantityCount > 0 && cart.length > 0) {
      return (
        <Cre8orlistModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          handleLoading={handleMintLoading}
        />
      )
    }

    return (
      <WaitCre8orsModal
        isModalVisible={isVisibleModal}
        toggleIsVisible={toggleModal}
        hasAllowListRole={applicant?.isVerified}
        isCre8orsDay={!isCre8orlistDay}
      />
    )
  }

  return selectModal()
}

export default ModalSelector
