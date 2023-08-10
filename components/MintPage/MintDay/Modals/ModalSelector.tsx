import { FC, useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

import _ from "lodash"
import MintMoreModal from "./MintMoreModal"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { useMintProvider } from "../../../../providers/MintProvider"
import CombinationModal from "./CombinationModal"
import Cre8orlistModal from "./Cre8orlistModal"
import PublicSaleModal from "./PublicSaleModal"
import { isWhitelisted } from "../../../../lib/merkle/isWhitelisted"

interface ModalSelectorProps {
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ toggleModal }) => {
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
  const hasWhitelist = useMemo(() => isWhitelisted(address), [address])

  const handleMintLoading = (isMintLoading: boolean) => {
    setMintLoading(isMintLoading)
  }

  const { mintCre8ors, freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay()

  useEffect(() => {
    if (address) setShouldOpenSuccessModal(false)
  }, [address])

  const isFreeMintModal = (hasPassport && hasUnclaimedFreeMint) || hasFriendAndFamily
  const openMintModal = leftQuantityCount > 0 && _.sum(cart) > 0
  console.log("SWEETS OPEN MINT MODAL hasWhitelist", hasWhitelist)

  const selectModal = () => {
    if (shouldOpenSuccessModal)
      return (
        <MintMoreModal
          isModalVisible={shouldOpenSuccessModal}
          toggleIsVisible={() => {
            setShouldOpenSuccessModal(!shouldOpenSuccessModal)
            toggleModal()
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
          isModalVisible
          toggleIsVisible={toggleModal}
          coreMintFunc={
            hasPassport && hasUnclaimedFreeMint ? freeMintPassportHolder : freeMintFamilyAndFriend
          }
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          loading={mintLoading}
          handleLoading={handleMintLoading}
        />
      )

    if (openMintModal) {
      if (hasWhitelist) {
        return (
          <Cre8orlistModal
            isModalVisible
            toggleIsVisible={toggleModal}
            openSuccessModal={() => setShouldOpenSuccessModal(true)}
            handleLoading={handleMintLoading}
          />
        )
      }
      return (
        <PublicSaleModal
          isModalVisible
          toggleIsVisible={toggleModal}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          handleLoading={handleMintLoading}
        />
      )
    }

    if (!(publicSaleActive || loadingSaleStatus) && !isReloadingChainData)
      return <WaitCre8orsModal isModalVisible toggleIsVisible={toggleModal} />

    return null
  }

  return selectModal()
}

export default ModalSelector
