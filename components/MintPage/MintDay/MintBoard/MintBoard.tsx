import { useState, useMemo, useEffect } from "react"
import { useMeasure } from "react-use"
import { useAccount } from "wagmi"
import SectionContainer from "../../SectionContainer"
import Title from "../../../Common/Title"
import Content from "../../../Common/Content"
import Character from "../../Character"
import Media from "../../../../shared/Media"
import ModalSelector from "../Modals/ModalSelector"
import { useMintProvider } from "../../../../providers/MintProvider"
import MintBoardButtons from "./ActionButtons"
import OnChainLoading from "../Modals/OnChainLoading"
import QuantityCards from "./QuantityCards"

const MintBoard = () => {
  const {
    hasPassport,
    hasUnclaimedFreeMint,
    hasFriendAndFamily,
    publicSaleActive,
    hasWhitelist,
    isLoadingInitialize,
  } = useMintProvider()

  const [openModal, setOpenModal] = useState(false)
  const { isConnected } = useAccount()
  const [boardRef, { height }] = useMeasure()
  const [oneTimeAutomaticOpen, setOneTimeAutomaticOpen] = useState(false)
  const [openChainDataLoadingModal, setOpenChainDataLoadingModal] = useState(false)

  const isFreeMintModal = (hasPassport && hasUnclaimedFreeMint) || hasFriendAndFamily

  const automaticOpenModal = useMemo(
    () =>
      (isFreeMintModal || (!isFreeMintModal && !hasWhitelist && !publicSaleActive)) &&
      (!oneTimeAutomaticOpen || (oneTimeAutomaticOpen && isFreeMintModal)),
    [isFreeMintModal, hasWhitelist, oneTimeAutomaticOpen, publicSaleActive],
  )

  useEffect(() => {
    if (automaticOpenModal && isConnected) {
      setOpenModal(true)
      setOneTimeAutomaticOpen(true)
      return
    }
    setOpenModal(false)
  }, [automaticOpenModal, isConnected])

  useEffect(() => {
    setOpenChainDataLoadingModal(isLoadingInitialize)
  }, [isLoadingInitialize])

  return (
    <>
      <SectionContainer>
        <div
          className="relative w-full !h-[100vh] flex justify-center items-start xl:items-center z-[1]"
          ref={boardRef}
        >
          <div
            className="
            pt-[70px]
            xl:pt-[90px]
            flex flex-col items-center
            w-[100vw]"
          >
            <Title
              text="Holy Shit, A Fair Mint"
              className="leading-[103.3%] text-center
              !text-[25px] samsungS8:!text-[28px] xs:!text-[31px] xl:!text-[65px] fade_in_text"
            />
            <Content
              content={`You choose how much you pay, depending on how long you plan on holding.\nIf you change your mind, unlock later by paying the difference.\nCre8orsList (Allowlist) can mint up to 8 NFTs per wallet.`}
              className="leading-[103.3%] text-center
                pt-[10px] xl:pt-[27px]
                !text-[8.5px] xs:!text-[10px] xl:!text-[19px]
                drop-shadow-[0_4px_2px_rgba(0,0,0,0.75)] fade_in_text"
            />
            <div
              className="grid grid-cols-1 xl:grid-cols-3 pt-[20px] xl:pt-[40px] 
              gap-y-[10px] xs:gap-y-[20px] 
              xl:w-[1078px]"
            >
              <QuantityCards height={height} />
            </div>
            <MintBoardButtons setOpenModal={setOpenModal} />
            <div
              className="pt-[15px] xs:pt-[20px] xl:pt-[27px] 
            flex justify-center items-center gap-x-[10px]"
            >
              <Content
                className="!text-[15px] xl:!text-[18px]"
                content="Scroll down to learn more"
              />
              <Media
                link="/assets/Mint/MintNow/down-arrow.svg"
                type="image"
                containerClasses="w-[15px] h-[15px]"
                blurLink="/assets/Mint/MintNow/down-arrow.svg"
              />
            </div>
            <ModalSelector
              isVisibleModal={openModal}
              toggleModal={() => setOpenModal(!openModal)}
            />
          </div>
        </div>
        <div>
          <div className="hidden xl:block">
            <Character
              link="/assets/Mint/MintNow/character_woman.png"
              originWidth={358}
              originHeight={436}
              className="!absolute bottom-0 right-0"
              screenWidth={1440}
            />
          </div>
        </div>
      </SectionContainer>
      <OnChainLoading isModalVisible={openChainDataLoadingModal} />
    </>
  )
}

export default MintBoard
