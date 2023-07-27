import { FC, useEffect, useState, useCallback, useMemo } from "react"
import { useAccount, useSigner } from "wagmi"
import Confetti from "react-confetti"
import { useWindowSize } from "usehooks-ts"
import PassportModal from "./PassportModal"
import MintMoreModal from "./MintMoreModal"
import FriendFamilyModal from "./FriendFamilyModal"
import getApplicant from "../../../../lib/getApplicant"
import WaitCre8orsModal from "./WaitCre8orsModal"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"
import { getLockedCount } from "../../../../lib/cre8or"
import { getQuantityLeft } from "../../../../lib/minterUtility"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()

  const [loading, setLoading] = useState(false)
  const [applicant, setApplicant] = useState({} as any)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState(null)
  const [leftQuantityCount, setLeftQuantityCount] = useState(null)

  const { width, height } = useWindowSize()

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const setConfettiEffect = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  const getLockedAndQuantityInformation = useCallback(async () => {
    if (!address) return
    const lockedCnt = await getLockedCount(address)
    const response = await getQuantityLeft(address)
    setLockedCntOfCre8or(lockedCnt)
    if (!response.error) setLeftQuantityCount(response)
  }, [address])

  const {
    hasPassportAndNotFreeMinted,
    hasFriendAndFamily,
    mintCre8ors,
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
  } = usePassportMintDay({
    address,
    signer,
    setConfettiEffect,
    getLockedAndQuantityInformation,
    setLoading: handleLoading,
  })

  const canOpenModal = useMemo(() => {
    if (
      hasPassportAndNotFreeMinted !== null &&
      hasFriendAndFamily !== null &&
      leftQuantityCount !== null &&
      lockedCntOfCre8or !== null
    )
      return true
    return false
  }, [hasPassportAndNotFreeMinted, hasFriendAndFamily, lockedCntOfCre8or, leftQuantityCount])

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
    getLockedAndQuantityInformation()
  }, [getLockedAndQuantityInformation])

  const selectModal = () => {
    if (hasFriendAndFamily)
      return (
        <FriendFamilyModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          freeMint={freeMintFamilyAndFriend}
          loading={loading}
        />
      )
    if (hasPassportAndNotFreeMinted)
      return (
        <PassportModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          freeMint={freeMintPassportHolder}
          loading={loading}
        />
      )

    if (leftQuantityCount)
      return (
        <MintMoreModal
          possibleMintCount={leftQuantityCount}
          lockedCntOfCre8or={lockedCntOfCre8or}
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          mintCre8or={mintCre8ors}
          loading={loading}
        />
      )

    return (
      <WaitCre8orsModal
        isModalVisible={isVisibleModal}
        toggleIsVisible={toggleModal}
        hasAllowListRole={applicant?.isVerified}
        isCre8orsDay={!isCre8orlistDay}
      />
    )
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      {canOpenModal && (
        <>
          {selectModal()}
          {showConfetti && (
            <div className="fixed w-full h-screen top-0 left-0 z-[80] pointer-events-none">
              <Confetti width={width} height={height} />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default ModalSelector
