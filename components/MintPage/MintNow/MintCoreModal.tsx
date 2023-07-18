import { FC, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import Confetti from "react-confetti"
import { useWindowSize } from "usehooks-ts"
import DetectedPassportModal from "./DetectedPassportModal"
import WaitCre8orsModal from "./WaitCre8orsModal"
import MintMoreModal from "./MintMoreModal"
import getApplicant from "../../../lib/getApplicant"
import DetectedFriendFamilyModal from "./DetectedFriendFamilyModal"

interface MintCoreModalProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const MintCoreModal: FC<MintCoreModalProps> = ({ isVisibleModal, toggleModal }) => {
  const maxOfCre8ors = 4

  const { address } = useAccount()
  const [applicant, setApplicant] = useState({} as any)
  const [balanceOfCre8or, setBalanceOfCre8or] = useState(0)
  const [lockedCntOfCre8tor, setLockecCntOfCre8or] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loading, setLoading] = useState(false)

  const { width, height } = useWindowSize()

  const hasPassport = true
  const hasFriendFamily = true

  useEffect(() => {
    const init = async () => {
      const response = await getApplicant(address)
      setApplicant(response)
    }
    if (!address) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  // const isPublicDay = new Date().getTime() >= new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const setConfettiEffect = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 8000)
  }

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const getBalanceOfCre8or = () => {
    setTimeout(() => {
      setBalanceOfCre8or(1)
      setLockecCntOfCre8or(1)
    }, 2000)
  }

  const mintCre8or = () => {
    setLoading(true)
    setTimeout(() => {
      getBalanceOfCre8or()
      setTimeout(() => {
        setLoading(false)
        setConfettiEffect()
      }, 2000)
    }, 2000)
  }

  return (
    <>
      {!balanceOfCre8or &&
        // eslint-disable-next-line no-nested-ternary
        (hasFriendFamily ? (
          <DetectedFriendFamilyModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            mintCre8or={mintCre8or}
            loading={loading}
          />
        ) : hasPassport ? (
          <DetectedPassportModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            mintCre8or={mintCre8or}
            loading={loading}
          />
        ) : (
          <WaitCre8orsModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            hasAllowListRole={applicant?.isVerified}
            isCre8orsDay={!isCre8orlistDay}
          />
        ))}

      {balanceOfCre8or && (
        <MintMoreModal
          possibleMintCount={maxOfCre8ors - balanceOfCre8or}
          lockedCntOfCre8or={lockedCntOfCre8tor}
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          mintCre8or={mintCre8or}
          loading={loading}
        />
      )}
      {showConfetti && (
        <div className="fixed w-full h-screen top-0 left-0 z-[80] pointer-events-none">
          <Confetti width={width} height={height} />
        </div>
      )}
    </>
  )
}

export default MintCoreModal
