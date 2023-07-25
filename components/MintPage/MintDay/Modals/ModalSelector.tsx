import { FC, useEffect, useState, useCallback } from "react"
import { useAccount } from "wagmi"
import Confetti from "react-confetti"
import { useWindowSize } from "usehooks-ts"
import PassportModal from "./PassportModal"
import MintMoreModal from "./MintMoreModal"
import FriendFamilyModal from "./FriendFamilyModal"
import getApplicant from "../../../../lib/getApplicant"
import WaitCre8orsModal from "./WaitCre8orsModal"
import collectiveAbi from "../../../../lib/abi-collective.json"
import checkPassport from "../../../../lib/checkPassport"
import balanceOfAddress from "../../../../lib/balanceOfAddress"
import { hasDiscount } from "../../../../lib/friendAndFamily"

interface ModalSelectorProps {
  isVisibleModal: boolean
  toggleModal: () => void
}

const ModalSelector: FC<ModalSelectorProps> = ({ isVisibleModal, toggleModal }) => {
  const maxOfCre8ors = 8
  const { address } = useAccount()
  const [applicant, setApplicant] = useState({} as any)
  const [balanceOfCre8or, setBalanceOfCre8or] = useState(0)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState(8)
  const [showConfetti, setShowConfetti] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasPassport, setHasPassport] = useState(false)
  const [hasFriendAndFamily, setHasFriendAndFamily] = useState(false)

  const { width, height } = useWindowSize()

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const getFriendsAndFamilyInformation = useCallback(async () => {
    if(!address) return
    const detectedDiscount = await hasDiscount(address)
    setHasFriendAndFamily(detectedDiscount)
  }, [address])

  const getPassportInformation = useCallback(async () => {
    if (!address) return
    const detectedPass = await checkPassport(address, collectiveAbi)
    setHasPassport(detectedPass)
  }, [address])

  const getCre8orBalance = useCallback(async () => {
    if (!address) return
    const balanceOf = await balanceOfAddress(address)
    setBalanceOfCre8or(parseInt(balanceOf.toString(), 10))
    setLockedCntOfCre8or(8)
  }, [address])

  const setConfettiEffect = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
    }, 8000)
  }

  const mintCre8or = async () => {
    setLoading(true)
    await getCre8orBalance()
    setTimeout(() => {
      setLoading(false)
      setConfettiEffect()
    }, 2000)
  }

  useEffect(() => {
    getPassportInformation()
  }, [getPassportInformation])

  useEffect(() => {
    getCre8orBalance()
  }, [getCre8orBalance])

  useEffect(() => {
    getFriendsAndFamilyInformation()
  }, [getFriendsAndFamilyInformation])

  useEffect(() => {
    const init = async () => {
      const response = await getApplicant(address)
      setApplicant(response)
    }
    if (!address) return
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  return (
    <>
      {!balanceOfCre8or &&
        // eslint-disable-next-line no-nested-ternary
        (hasFriendAndFamily ? (
          <FriendFamilyModal
            isModalVisible={isVisibleModal}
            toggleIsVisible={toggleModal}
            mintCre8or={mintCre8or}
            loading={loading}
          />
        ) : hasPassport ? (
          <PassportModal
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
          lockedCntOfCre8or={lockedCntOfCre8or}
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

export default ModalSelector
