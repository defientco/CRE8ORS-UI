import { FC, useEffect, useState, useCallback, useMemo } from "react"
import { useAccount, useSigner } from "wagmi"
import Confetti from "react-confetti"
import { useWindowSize } from "usehooks-ts"
import PassportModal from "./PassportModal"
import MintMoreModal from "./MintMoreModal"
import FriendFamilyModal from "./FriendFamilyModal"
import getApplicant from "../../../../lib/getApplicant"
import WaitCre8orsModal from "./WaitCre8orsModal"
import balanceOfAddress from "../../../../lib/balanceOfAddress"
import usePassportMintDay from "../../../../hooks/mintDay/usePassportMintDay"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const maxOfCre8ors = 8

  const { address } = useAccount()
  const { data: signer } = useSigner()

  const [loading, setLoading] = useState(false)
  const [applicant, setApplicant] = useState({} as any)
  const [balanceOfCre8or, setBalanceOfCre8or] = useState(-1)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState(8)

  const { width, height } = useWindowSize()

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const setConfettiEffect = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 8000)
  }

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  const getCre8orBalance = useCallback(async () => {
    if (!address) return
    const balanceOf = await balanceOfAddress(address)
    setBalanceOfCre8or(parseInt(balanceOf.toString(), 10))
    setLockedCntOfCre8or(8)
  }, [address])

  const {
    hasPassport,
    hasFriendAndFamily,
    isClaimedFree,
    mintCre8ors,
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
  } = usePassportMintDay({
    address,
    signer,
    setConfettiEffect,
    getCre8orBalance,
    setLoading: handleLoading,
  })

  const canOpenModal = useMemo(() => {
    if (hasPassport !== undefined && hasFriendAndFamily !== null && balanceOfCre8or !== -1)
      return true
    return false
  }, [hasPassport, hasFriendAndFamily, balanceOfCre8or])

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
    getCre8orBalance()
  }, [getCre8orBalance])

  const selectModal = () => {
    if (!balanceOfCre8or) {
      if (hasFriendAndFamily)
        return (
          <FriendFamilyModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            freeMint={freeMintFamilyAndFriend}
            loading={loading}
          />
        )
      if (hasPassport && !isClaimedFree)
        return (
          <PassportModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            freeMint={freeMintPassportHolder}
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
      <MintMoreModal
        possibleMintCount={maxOfCre8ors - balanceOfCre8or}
        lockedCntOfCre8or={lockedCntOfCre8or}
        isModalVisible={isVisibleModal}
        toggleIsVisible={toggleModal}
        mintCre8or={mintCre8ors}
        loading={loading}
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
