import Link from "next/link"
import { useMediaQuery } from "usehooks-ts"
import { useMeasure } from "react-use"
import { useState } from "react"
import { useAccount } from "wagmi"
import SectionContainer from "./SectionContainer"
import Title from "../Common/Title"
import Content from "../Common/Content"
import Character from "./Character"
import Media from "../../shared/Media"
import Timer from "./MintNow/Timer"
import MintCard from "./MintNow/MintCard"
import { Button } from "../../shared/Button"
import MintCoreModal from "./MintNow/MintCoreModal"
import WalletConnectButton from "../WalletConnectButton"

const MintNow = () => {
  const canMintNow = new Date().getTime() >= new Date("08 Aug 2023 08:00:00 UTC").getTime()
  const isXl = useMediaQuery("(max-width: 1150px")

  const [containerRef, containerSizes] = useMeasure()
  const [timerRef, timerSizes] = useMeasure()

  const [openModal, setOpenModal] = useState(false)

  const { isConnected } = useAccount()

  const [tierIQuantity, setTierIQuantity] = useState(0)
  const [tierIIQuantity, setTierIIQuantity] = useState(0)
  const [tierIIIQuantity, setTierIIIQuantity] = useState(0)

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
        className="relative w-full min-h-[100vh] flex justify-center items-start xl:items-center z-[1]"
        ref={containerRef}
      >
        {!canMintNow ? (
          <div
            className="pt-[90px] pb-[90px]
          flex flex-col items-center
          w-[100vw]
          bg-[url('/assets/Mint/MintNow/mobile_background.png')]
          bg-cover bg-[bottom_center]
          xl:bg-none"
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
              className="grid grid-cols-1 xl:grid-cols-3 pt-[40px] 
            gap-y-[20px] xl:w-[1078px]"
            >
              <MintCard
                label="Tier I"
                mintPrice="0.05"
                desc="8 Month Lockup"
                className="bg-[#E93F45]"
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                quantity={tierIQuantity}
                type={1}
              />
              <MintCard
                label="Tier II"
                mintPrice="0.10"
                desc="8 Week Lockup"
                className="bg-[#F4EE05]"
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                quantity={tierIIQuantity}
                type={2}
              />
              <MintCard
                label="Tier III"
                mintPrice="0.15"
                desc="No Lockup"
                className="bg-[#08E1E6]"
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                quantity={tierIIIQuantity}
                type={3}
              />
            </div>
            <div className="flex justify-center">
              {isConnected ? (
                <Button
                  id="mint_btn_mint_page"
                  className="mt-[40px] 
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
            <div className="pt-[27px] flex justify-center items-center gap-x-[10px]">
              <Content className="!text-[18px]" content="Scroll down to learn more" />
              <Media
                link="/assets/Mint/MintNow/down-arrow.svg"
                type="image"
                containerClasses="w-[15px] h-[15px]"
                blurLink="/assets/Mint/MintNow/down-arrow.svg"
              />
            </div>
            <MintCoreModal
              isVisibleModal={openModal}
              toggleModal={() => setOpenModal(!openModal)}
            />
          </div>
        ) : (
          <div className="flex flex-col justify-between items-center mt-[70px] xl:mt-0 xl:h-[470px]">
            <div className="xl:!hidden w-full flex justify-center pb-[35px]">
              <Media
                link="/assets/Mint/MintNow/mobile_character.png"
                blurLink="/assets/Mint/MintNow/mobile_character.png"
                type="image"
                containerClasses="w-[223px] h-[450px]"
                containerStyle={{
                  height: `${((containerSizes.height - timerSizes.height) / 3) * 2}px`,
                  width: `${
                    ((((containerSizes.height - timerSizes.height) / 3) * 2) / 450) * 233
                  }px`,
                }}
              />
            </div>
            <div ref={timerRef} className="flex justify-center flex-col items-center">
              <div className="flex items-center gap-x-[25px] pb-[20px] xl:pb-0">
                <Title
                  text="Mint Your Cre8or"
                  className="!text-[33px] xs:!text-[39px] xl:!text-[65px]"
                />
                {!isXl && (
                  <Link href="/faq" target="_self">
                    <div className="cursor-pointer">
                      <Media
                        link="/assets/Mint/help.png"
                        blurLink="/assets/Mint/help.png"
                        type="image"
                        containerClasses="w-[25px] h-[25px] xl:w-[40px] xl:h-[40px]"
                      />
                    </div>
                  </Link>
                )}
              </div>
              <Timer />
              <Content
                content="Passports: August 8th @ 8am EST • Allowlist: August 9th @ 8am EST • Public Sale : August 10th 8am EST"
                className="!text-[6px] xl:!text-[13px] pt-[20px] xl:pb-0"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        {canMintNow ? (
          <div className="xl:block hidden">
            <Character
              link="/assets/Mint/MintNow/character_woman.png"
              originWidth={358}
              originHeight={436}
              className="!absolute bottom-0 right-0"
              screenWidth={1440}
            />
          </div>
        ) : (
          <div className="xl:block hidden">
            <Character
              link="/assets/Mint/MintNow/character.png"
              originWidth={345.89}
              originHeight={692.14}
              className="!absolute bottom-0 left-0"
              screenWidth={1440}
            />
          </div>
        )}
      </div>
    </SectionContainer>
  )
}

export default MintNow
