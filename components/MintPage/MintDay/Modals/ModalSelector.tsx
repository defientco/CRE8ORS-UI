import { FC, useEffect, useState, useMemo } from "react"
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { toast } from "react-toastify"
import PassportModal from "./PassportModal"
import MintMoreModal from "./MintMoreModal"
import FriendFamilyModal from "./FriendFamilyModal"
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
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [applicant, setApplicant] = useState({} as any)

  const {
    hasPassport,
    hasNotFreeMintClaimed,
    hasFriendAndFamily,
    lockedCntOfCre8or,
    leftQuantityCount,
    freeMintCount,
    getFFAndPassportsInformation,
    getLockedAndQuantityInformation,
  } = useMintProvider()

  const [mintLoading, setMintLoading] = useState(false)
  const [refetchDataLoading, setRefetchDataLoading] = useState(false)

  const isCre8orlistDay =
    new Date().getTime() >= new Date("09 Aug 2023 08:00:00 UTC").getTime() &&
    new Date().getTime() < new Date("10 Aug 2023 08:00:00 UTC").getTime()

  const handleMintLoading = (isMintLoading: boolean) => {
    setMintLoading(isMintLoading)
  }

  const handleRefetch = async () => {
    setRefetchDataLoading(true)

    await getFFAndPassportsInformation()
    await getLockedAndQuantityInformation()

    setRefetchDataLoading(false)
  }

  const checkNetwork = () => {
    if (activeChain?.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)) {
      switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10))
      const allChains = [mainnet, goerli, polygon, polygonMumbai]
      const myChain = allChains.find(
        (blockchain) => blockchain.id === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10),
      )
      toast.error(`Please connect to ${myChain.name} and try again`)

      return false
    }

    return true
  }

  const { mintCre8ors, freeMintPassportHolder, freeMintFamilyAndFriend } = usePassportMintDay({
    signer,
  })

  const canOpenModal = useMemo(
    () =>
      hasPassport !== null &&
      hasNotFreeMintClaimed != null &&
      freeMintCount !== null &&
      hasFriendAndFamily != null,
    [hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily, freeMintCount],
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

  const selectModal = () => {
    if (hasFriendAndFamily && hasPassport && hasNotFreeMintClaimed)
      return (
        <CombinationModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={freeMintPassportHolder}
          loading={mintLoading}
          freeMintCount={freeMintCount}
          handleLoading={handleMintLoading}
          handleRefetch={handleRefetch}
          checkNetwork={checkNetwork}
        />
      )

    if (hasFriendAndFamily)
      return (
        <FriendFamilyModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={freeMintFamilyAndFriend}
          loading={mintLoading}
          handleLoading={handleMintLoading}
          checkNetwork={checkNetwork}
          handleRefetch={handleRefetch}
        />
      )
    if (hasPassport && hasNotFreeMintClaimed)
      return (
        <PassportModal
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={freeMintPassportHolder}
          loading={mintLoading}
          handleLoading={handleMintLoading}
          checkNetwork={checkNetwork}
          handleRefetch={handleRefetch}
        />
      )
    if (leftQuantityCount)
      return (
        <MintMoreModal
          possibleMintCount={leftQuantityCount}
          lockedCntOfCre8or={lockedCntOfCre8or}
          isModalVisible={isVisibleModal}
          toggleIsVisible={toggleModal}
          coreMintFunc={mintCre8ors}
          loading={mintLoading}
          handleLoading={handleMintLoading}
          handleRefetch={handleRefetch}
          checkNetwork={checkNetwork}
        />
      )

    if (!hasPassport)
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
      {canOpenModal && !refetchDataLoading && <>{selectModal()}</>}
    </>
  )
}

export default ModalSelector