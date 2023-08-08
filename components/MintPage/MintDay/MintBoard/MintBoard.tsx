import { useState, useMemo, useEffect } from "react"
import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import SectionContainer from "../../SectionContainer"
import Title from "../../../Common/Title"
import Content from "../../../Common/Content"
import Character from "../../Character"
import Media from "../../../../shared/Media"
import QuantityCard from "../QuantityCard"
import ModalSelector from "../Modals/ModalSelector"
import { useMintProvider } from "../../../../providers/MintProvider"
import MintBoardButtons from "./ActionButtons"

const MintBoard = () => {
  const {
    hasPassport,
    hasUnclaimedFreeMint,
    hasFriendAndFamily,
    presaleActive,
    addToCart,
    removeFromCart,
    getCartTier,
    hasWhitelist,
  } = useMintProvider()
  const [openModal, setOpenModal] = useState(false)
  const { isConnected } = useAccount()
  const [boardRef, { height }] = useMeasure()
  const isXs = useMediaQuery("max-width: 393px")
  const [oneTimeAutomaticOpen, setOneTimeAutomaticOpen] = useState(false)

  const isFreeMintModal = (hasPassport && hasUnclaimedFreeMint) || hasFriendAndFamily

  const automaticOpenModal = useMemo(
    () =>
      (isFreeMintModal || (!isFreeMintModal && hasWhitelist && !presaleActive)) &&
      (!oneTimeAutomaticOpen || (oneTimeAutomaticOpen && isFreeMintModal)),
    [isFreeMintModal, hasWhitelist, oneTimeAutomaticOpen, presaleActive],
  )

  useEffect(() => {
    if (automaticOpenModal && isConnected) {
      setOpenModal(true)
      setOneTimeAutomaticOpen(true)
      return
    }
    setOpenModal(false)
  }, [automaticOpenModal, isConnected])

  const increaseQuantity = (type: number) => {
    addToCart(type)
  }

  const decreaseQuantity = (type: number) => {
    removeFromCart(type)
  }

  return (
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
            <QuantityCard
              label="Tier I"
              mintPrice=".05"
              desc="8 Month Lockup"
              className="bg-[#E93F45]"
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={getCartTier(1)}
              type={1}
              height={(height - (isXs ? 320 : 285)) / 3}
            />
            <QuantityCard
              label="Tier II"
              mintPrice=".10"
              desc="8 Week Lockup"
              className="bg-[#F4EE05]"
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={getCartTier(2)}
              type={2}
              height={(height - (isXs ? 320 : 285)) / 3}
            />
            <QuantityCard
              label="Tier III"
              mintPrice=".15"
              desc="No Lockup"
              className="bg-[#08E1E6]"
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={getCartTier(3)}
              type={3}
              height={(height - (isXs ? 320 : 285)) / 3}
            />
          </div>
          <MintBoardButtons setOpenModal={setOpenModal} />
          <div
            className="pt-[15px] xs:pt-[20px] xl:pt-[27px] 
          flex justify-center items-center gap-x-[10px]"
          >
            <Content className="!text-[15px] xl:!text-[18px]" content="Scroll down to learn more" />
            <Media
              link="/assets/Mint/MintNow/down-arrow.svg"
              type="image"
              containerClasses="w-[15px] h-[15px]"
              blurLink="/assets/Mint/MintNow/down-arrow.svg"
            />
          </div>
          <ModalSelector isVisibleModal={openModal} toggleModal={() => setOpenModal(!openModal)} />
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
  )
}

export default MintBoard
