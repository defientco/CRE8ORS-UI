import { FC, useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

import MintMoreModal from "./MintMoreModal"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { useMintProvider } from "../../../../providers/MintProvider"
import CombinationModal from "./CombinationModal"
import Cre8orlistModal from "./Cre8orlistModal"
import isWhitelisted from "../../../../lib/merkle/isWhitelisted"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const { address } = useAccount()
  const {
    hasPassport,
    hasUnclaimedFreeMint,
    hasFriendAndFamily,
    leftQuantityCount,
    cart,
    publicSaleActive,
  } = useMintProvider()
  const [mintLoading, setMintLoading] = useState(false)
  const [shouldOpenSuccessModal, setShouldOpenSuccessModal] = useState(false)
  const whitelisted = useMemo(() => isWhitelisted(address), [address])

  const handleMintLoading = (isMintLoading: boolean) => {
    setMintLoading(isMintLoading)
  }

  const { mintCre8ors, freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay()

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

    if (leftQuantityCount > 0 && cart.length > 0 && whitelisted) {
      return (
        <Cre8orlistModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          handleLoading={handleMintLoading}
        />
      )
    }

    if (!publicSaleActive) {
      return <WaitCre8orsModal isModalVisible={isVisibleModal} toggleIsVisible={toggleModal} />
    }

    return null
  }

  return selectModal()
}

export default ModalSelector
