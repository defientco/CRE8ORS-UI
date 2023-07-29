import { useState, useMemo, useEffect } from "react"
import { useAccount } from "wagmi"
import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import SectionContainer from "../SectionContainer"
import Title from "../../Common/Title"
import Content from "../../Common/Content"
import Character from "../Character"
import Media from "../../../shared/Media"
import QuantityCard from "./QuantityCard"
import { Button } from "../../../shared/Button"
import WalletConnectButton from "../../WalletConnectButton"
import ModalSelector from "./Modals/ModalSelector"
import { useMintProvider } from "../../../providers/MintProvider"

const MintBoard = () => {
  const { hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily, freeMintCount } =
    useMintProvider()
  const [openModal, setOpenModal] = useState(false)

  const [boardRef, { height }] = useMeasure()
  const isXs = useMediaQuery("max-width: 393px")

  const { isConnected } = useAccount()

  const [tierIQuantity, setTierIQuantity] = useState(0)
  const [tierIIQuantity, setTierIIQuantity] = useState(0)
  const [tierIIIQuantity, setTierIIIQuantity] = useState(0)

  const automaticOpenModal = useMemo(
    () =>
      hasPassport !== null &&
      hasNotFreeMintClaimed != null &&
      freeMintCount !== null &&
      hasFriendAndFamily != null,
    [hasPassport, hasNotFreeMintClaimed, hasFriendAndFamily, freeMintCount],
  )

  useEffect(() => {
    setOpenModal(automaticOpenModal)
  }, [automaticOpenModal])

  const increaseQuantity = (type: number) => {
    switch (type) {
      case 1:
        setTierIQuantity(tierIQuantity + 1)
        break
      case 2:
        setTierIIQuantity(tierIIQuantity + 1)
        break
      case 3:
        setTierIIIQuantity(tierIIIQuantity + 1)
        break
      default:
    }
  }

  const decreaseQuantity = (type: number) => {
    switch (type) {
      case 1:
        if (!tierIQuantity) return
        setTierIQuantity(tierIQuantity - 1)
        break
      case 2:
        if (!tierIIQuantity) return
        setTierIIQuantity(tierIIQuantity - 1)
        break
      case 3:
        if (!tierIIIQuantity) return
        setTierIIIQuantity(tierIIIQuantity - 1)
        break
      default:
    }
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
              quantity={tierIQuantity}
              type={1}
              height={(height - (isXs ? 285 : 320)) / 3}
            />
            <QuantityCard
              label="Tier II"
              mintPrice=".10"
              desc="8 Week Lockup"
              className="bg-[#F4EE05]"
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={tierIIQuantity}
              type={2}
              height={(height - (isXs ? 285 : 320)) / 3}
            />
            <QuantityCard
              label="Tier III"
              mintPrice=".15"
              desc="No Lockup"
              className="bg-[#08E1E6]"
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={tierIIIQuantity}
              type={3}
              height={(height - (isXs ? 285 : 320)) / 3}
            />
          </div>
          <div className="flex justify-center">
            {isConnected ? (
              <Button
                id="mint_btn_mint_page"
                className="mt-[20px] xl:mt-[40px] 
                xl:w-[308px] xl:h-[88px] 
                w-[133px] h-[38px]
                text-[14px] xl:text-[30px] 
                rounded-[5px] xl:rounded-[15px]"
                onClick={() => setOpenModal(true)}
              >
                Mint now
              </Button>
            ) : (
              <WalletConnectButton>
                <div
                  className="px-0 py-0
                  mt-[40px] uppercase
                  xl:w-[328px] xl:h-[88px] 
                  w-[153px] h-[38px]
                  text-[14px] xl:text-[30px] 
                  rounded-[5px] xl:rounded-[15px]
                  hover:scale-[1.1] scale-[1] transition duration-[300ms]
                  bg-[black] dark:bg-[white] 
                  shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
                  flex items-center justify-center gap-[10px]
                  font-bold font-quicksand"
                >
                  Connect Wallet
                </div>
              </WalletConnectButton>
            )}
          </div>
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
