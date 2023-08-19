import { useRef, useState } from "react"
import { useAccount } from "wagmi"
import { BigNumber } from "ethers"
import { Button } from "../../shared/Button"
import Media from "../../shared/Media"
import Layout from "../Layout"
import MintCTAButton from "./MintCTAButton"
import useShakeEffect from "../../hooks/useShakeEffect"
import MintingModal from "./MintV2/MintingModal"
import SuccessModal from "./MintV2/SuccessModal"
import useCre8orMintV2 from "../../hooks/mintDay/useCre8orMintV2"
import WalletConnectButton from "../WalletConnectButton"
import getNFTs from "../../lib/alchemy/getNFTs"

const MintV2Page = () => {
  const [mintQuantity, setMintQuantity] = useState(1)
  const [securedNumber, setSecuredNumber] = useState(null)

  const minusRef = useRef()
  const mintRef = useRef()
  const [isMintLoading, setIsMintLoading] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const { mint, totalSupply, getTotalSupply } = useCre8orMintV2()
  const { isConnected, address } = useAccount()

  const increateAmount = () => {
    setMintQuantity(mintQuantity + 1)
  }

  const decreaseAmount = () => {
    if (mintQuantity === 0) return
    setMintQuantity(mintQuantity - 1)
  }

  const getSecuredNumber = async () => {
    const response = await getNFTs(
      address as string,
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
    )

    if (response?.ownedNfts.length) {
      const lastCre8or = response.ownedNfts[response.totalCount - 1]
      const tokenId = BigNumber.from(lastCre8or.id.tokenId).toString()
      setSecuredNumber(tokenId)
    }
  }

  const mintNFT = async () => {
    if (!mintQuantity) return

    setIsMintLoading(true)
    const response = await mint(mintQuantity)
    if (!response.err) {
      await getTotalSupply()
      await getSecuredNumber()
      setOpenSuccessModal(true)
    }

    setIsMintLoading(false)
  }

  useShakeEffect({
    ref: minusRef,
    isEnabled: mintQuantity === 0,
  })

  useShakeEffect({
    ref: mintRef,
    isEnabled: mintQuantity === 0,
  })

  return (
    <>
      <Layout type="contained">
        <div
          className="relative w-[100%] h-[100vh]
                            flex flex-col items-center justify-center
                            pt-[60px] md:pt-0
                            fade_in_text"
        >
          <Media
            type="image"
            link="/assets/MintV2/mint-here.svg"
            blurLink="/assets/MintV2/mint-here.png"
            containerClasses="md:w-[500px] md:h-[172px]
                        w-[300px] h-[103px]"
          />
          <pre
            className="fade_in_text text-[15px] md:text-[20px] font-quicksand font-medium
                    text-center leading-[99.3%]"
          >
            {`No lockup. No allowlist.\nFirst come, first serve.\nPrice: 0.05 ETH`}
          </pre>
          <div
            className="flex justify-center items-center
                    gap-x-[30px]
                    pt-[10px] md:pt-[30px]
                    fade_in_text"
          >
            <div ref={minusRef}>
              <Button
                id="minus_btn"
                className="!p-0 
                          md:w-[55px] md:h-[55px]
                          w-[40px] h-[40px]
                          !bg-[white] !text-black
                          text-[30px] md:text-[50px]
                          font-bold font-quicksand
                          rounded-[10px]"
                onClick={decreaseAmount}
              >
                -
              </Button>
            </div>
            <div
              className="font-bold font-eigerdals 
                            uppercase text-black dark:text-[white] rounded bg-[white] dark:bg-[black] 
                            shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
                            flex items-center justify-center gap-[10px]
                            text-[35px] md:text-[50px] 
                            md:w-[120px] md:h-[120px]
                            w-[70px] h-[70px]
                            rounded-[16px]"
            >
              {mintQuantity}
            </div>
            <Button
              id="plus_btn"
              className="!p-0
                        md:w-[55px] md:h-[55px]
                        w-[40px] h-[40px]
                        !bg-[white] !text-black
                        text-[30px] md:text-[50px]
                        font-bold font-quicksand.
                        rounded-[10px]"
              onClick={increateAmount}
            >
              +
            </Button>
          </div>
          <pre
            className="text-[16px] md:text-[21px] font-quicksand font-medium
                    pt-[15px] md:pt-[20px]"
          >
            {totalSupply || "---"} / 4444
          </pre>
          {isConnected ? (
            <div ref={mintRef}>
              <Button
                id="mint_btn"
                className="my-[15px] md:my-[20px] !p-0 md:w-[150px] md:h-[55px]
                          h-[40px] w-[130px] fade_in_text"
                onClick={mintNFT}
              >
                Mint Now
              </Button>
            </div>
          ) : (
            <WalletConnectButton>
              <div
                className="uppercase
            text-[16px] text-white
            rounded-[5px]
            hover:scale-[1.1] scale-[1] transition duration-[300ms]
            bg-[black] 
            shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
            flex items-center justify-center gap-[10px]
            font-quicksand
            my-[15px] md:my-[20px] 
            !p-0 
            md:w-[200px] md:h-[50px]
            h-[40px] w-[130px] fade_in_text"
              >
                Connect Wallet
              </div>
            </WalletConnectButton>
          )}
          <div className="flex justify-center gap-x-[20px] pt-[30px] fade_in_text">
            <MintCTAButton
              id="opensea_cta_btn"
              bgLink="/assets/MintV2/opensea.svg"
              blurBgLink="/assets/MintV2/opensea.png"
              link="https://opensea.io/collection/cre8orsaipeps"
            />
            <MintCTAButton
              id="twitter_cta_btn"
              bgLink="/assets/MintV2/twitter.svg"
              blurBgLink="/assets/MintV2/twitter.png"
              link="https://twitter.com/Cre8orsNFT"
            />
            <MintCTAButton
              id="discord_cta_btn"
              bgLink="/assets/MintV2/discord.svg"
              blurBgLink="/assets/MintV2/discord.png"
              link="https://discord.gg/ZpZBHCrqHQ"
            />
          </div>
        </div>
      </Layout>
      {isMintLoading && <MintingModal />}
      <SuccessModal
        isModalVisible
        toggleIsVisible={() => setOpenSuccessModal(!openSuccessModal)}
        securedNumber={securedNumber}
      />
    </>
  )
}

export default MintV2Page
