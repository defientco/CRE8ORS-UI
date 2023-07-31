import { FC, useEffect, useState, useMemo } from "react"
import { useAccount, useSigner } from "wagmi"

import MintMoreModal from "./MintMoreModal"
import getApplicant from "../../../../lib/getApplicant"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { useMintProvider } from "../../../../providers/MintProvider"
import CombinationModal from "./CombinationModal"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const [applicant, setApplicant] = useState({} as any)

  const { hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily } = useMintProvider()

  const [mintLoading, setMintLoading] = useState(false)
  const [shouldOpenSuccessModal, setShouldOpenSuccessModal] = useState(false)

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const handleMintLoading = (isMintLoading: boolean) => {
    setMintLoading(isMintLoading)
  }

  const { mintCre8ors, freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay({
    signer,
  })

  const canOpenModal = useMemo(
    () =>
      (hasPassport !== null && hasNotFreeMintClaimed != null && hasFriendAndFamily != null) ||
      shouldOpenSuccessModal,
    [hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily, shouldOpenSuccessModal],
  )

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

  const selectModal = () => {
    if (shouldOpenSuccessModal)
      return (
        <MintMoreModal
          isModalVisible={shouldOpenSuccessModal}
          toggleIsVisible={() => setShouldOpenSuccessModal(!shouldOpenSuccessModal)}
          coreMintFunc={mintCre8ors}
          loading={mintLoading}
          handleLoading={handleMintLoading}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
        />
      )
    if ((hasPassport && hasNotFreeMintClaimed) || hasFriendAndFamily)
      return (
        <CombinationModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={hasFriendAndFamily ? freeMintFamilyAndFriend : freeMintPassportHolder}
          openSuccessModal={() => setShouldOpenSuccessModal(true)}
          loading={mintLoading}
          handleLoading={handleMintLoading}
        />
      )

    if (!(hasPassport && hasNotFreeMintClaimed) && !hasFriendAndFamily)
      return (
        <WaitCre8orsModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          hasAllowListRole={applicant?.isVerified}
          isCre8orsDay={!isCre8orlistDay}
        />
      )

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      {canOpenModal && <>{selectModal()}</>}
    </>
  )
}

export default ModalSelector
