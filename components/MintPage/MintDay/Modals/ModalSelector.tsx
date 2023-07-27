import { FC, useEffect, useState, useCallback, useMemo } from "react"
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi"
import Confetti from "react-confetti"
import { useWindowSize } from "usehooks-ts"
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { toast } from "react-toastify"
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
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [applicant, setApplicant] = useState({} as any)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState(null)
  const [leftQuantityCount, setLeftQuantityCount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [getttingModalStatus, setGettingModalStatus] = useState(false)

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

  const handleGettingModalStatus = (isLoading: boolean) => {
    setGettingModalStatus(isLoading)
  }

  const checkNetwork = useCallback(async () => {
    if (activeChain?.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)) {
      await switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10))
      const allChains = [mainnet, goerli, polygon, polygonMumbai]
      const myChain = allChains.find(
        (blockchain) => blockchain.id === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10),
      )
      toast.error(`Please connect to ${myChain.name} and try again`)
    }
  }, [activeChain, switchNetwork])

  const getLockedAndQuantityInformation = useCallback(async () => {
    if (!address) return
    const lockedCnt = await getLockedCount(address)
    const response = await getQuantityLeft(address)
    setLockedCntOfCre8or(lockedCnt)
    if (!response.error) setLeftQuantityCount(response)
  }, [address])

  const {
    hasPassport,
    hasNotFreeMintClaimed,
    hasFriendAndFamily,
    mintCre8ors,
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
  } = usePassportMintDay({
    address,
    signer,
    setConfettiEffect,
    getLockedAndQuantityInformation,
    handleLoading,
    handleGettingModalStatus,
  })

  const canOpenModal = useMemo(() => {
    if (
      hasPassport !== null &&
      hasNotFreeMintClaimed !== null &&
      hasFriendAndFamily !== null &&
      leftQuantityCount !== null &&
      lockedCntOfCre8or !== null
    )
      return true
    return false
  }, [hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily, lockedCntOfCre8or, leftQuantityCount])

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

  useEffect(() => {
    checkNetwork()
  }, [checkNetwork])

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
    if (hasPassport && hasNotFreeMintClaimed)
      return (
        <PassportModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          freeMint={freeMintPassportHolder}
          loading={loading}
        />
      )

    if (!hasPassport || (hasPassport && hasNotFreeMintClaimed === false))
      return (
        <WaitCre8orsModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          hasAllowListRole={applicant?.isVerified}
          isCre8orsDay={!isCre8orlistDay}
        />
      )

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
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      {canOpenModal && !getttingModalStatus && (
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
