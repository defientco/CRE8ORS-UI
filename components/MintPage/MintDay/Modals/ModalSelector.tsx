import { FC, useEffect, useState } from "react"
import { useAccount } from "wagmi"

import _ from "lodash"
import MintMoreModal from "./MintMoreModal"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { useMintProvider } from "../../../../providers/MintProvider"
import CombinationModal from "./CombinationModal"
import PublicSaleModal from "./PublicSaleModal"

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
    loadingSaleStatus,
    isReloadingChainData,
  } = useMintProvider()
  const [mintLoading, setMintLoading] = useState(false)
  const [shouldOpenSuccessModal, setShouldOpenSuccessModal] = useState(false)

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

    if (isFreeMintModal && !isReloadingChainData)
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

    if (leftQuantityCount > 0 && _.sum(cart) > 0) {
      return (
        <PublicSaleModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          handleLoading={handleMintLoading}
        />
      )
    }

    if (!(publicSaleActive || loadingSaleStatus) && !isReloadingChainData)
      return <WaitCre8orsModal isModalVisible={isVisibleModal} toggleIsVisible={toggleModal} />

    return null
  }

  return selectModal()
}

export default ModalSelector
