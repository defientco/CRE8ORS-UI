import { useMeasure } from "react-use"
import { useRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useSigner } from "wagmi"
import Image from "next/image"
import Layout from "../Layout"
import SectionTitle from "../LandingPage/SectionTitle"
import SectionContent from "../LandingPage/SectionContent"
import { Button } from "../../shared/Button"
import Media from "../../shared/Media"
import Footer from "../Footer"
import { useTheme } from "../../providers/ThemeProvider"
import WalletConnectButton from "../WalletConnectButton"

const ReservePage = () => {
  const [containerRef, { width }] = useMeasure()

  const { data: signer } = useSigner()

  const isResponsive = useMediaQuery("(max-width: 1429px)")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { themeMode } = useTheme()

  const titleRef = useRef()
  const contentRef = useRef()
  const buttonRef = useRef()

  return (
    <Layout type="base">
      <div
        className="relative overflow-y-auto min-h-[100vh] overflow-x-hidden z-[1] w-[100vw]"
        ref={containerRef}
      >
        {width && (
          <div
            className="relative z-[6] flex flex-col items-center pt-[80px]"
            style={{
              width: `${width}px`,
              height: isResponsive ? `auto` : `${(1048 / 1579) * width}px`,
              minHeight: isResponsive ? "100vh" : "",
              backgroundImage:
                // eslint-disable-next-line no-nested-ternary
                themeMode === "light"
                  ? "url('/assets/Claim/white_background.svg')"
                  : isMobile
                  ? "url('/assets/Claim/mobile_dark_background.svg')"
                  : "url('/assets/Claim/background.svg')",
              backgroundSize: isResponsive
                ? `cover`
                : `${width * 1.04}px ${(1048 / 1579) * width * 1.04}px`,
              backgroundPosition: isResponsive
                ? `center center`
                : `bottom 0px right -${themeMode === "light" ? 0 : width * 0.04}px`,
            }}
          >
            <div className="max-w-[1280px] flex-grow flex flex-col justify-end md:flex-row items-center pb-[10px] md:pb-[50px] md:pb-0">
              <div className="flex justify-center md:hidden mb-[10px]">
                {width && (
                  <Media
                    type="image"
                    link="/assets/Claim/Success/pass.svg"
                    containerClasses="rounded-[10px] overflow-hidden z-[1] w-[273px] h-[273px]"
                  />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col justify-center">
                  <div ref={titleRef}>
                    <SectionTitle
                      text="Reserve a Cre8ors Collective Passport"
                      className="!mx-[0px] !mt-6 !mb-4 xs:!mx-0 sm:!m-6 
                        w-[290px] samsungS8:w-[375px] lg:w-[605px] 
                        !text-[30px] samsungS8:!text-[33px] lg:!text-[64px] md:text-left 
                        md:leading-[106.3%]"
                    />
                  </div>
                  <div className="flex justify-center" ref={contentRef}>
                    <SectionContent
                      className="w-[290px] samsungS8:w-[375px] 
                      md:w-[570px] !m-[8px] !mt-[30px] sm:!mt-[20px] md:!mt-[0px] md:text-left"
                    >
                      <div className="px-0 font-medium">
                        {isMobile ? (
                          <>
                            Connecting the world&apos;s top web3 creators
                            <br />
                            and world-class brands. Reserve a Cre8ors
                            <br />
                            Collective Passport today. Price adjusts
                            <br />
                            based on the number of Pendant NFTs
                            <br />
                            you hold. <span className="underline">For more info read the FAQ.</span>
                          </>
                        ) : (
                          <>
                            Connecting the world&apos;s tp web3 creators and world-class brands,
                            <br />
                            Reserve a Cre8ors Collective Passport today. Price adjusts based on
                            <br />
                            the number of Pendant NFTs you hold.{" "}
                            <span className="underline">For moe info read the FAP.</span>
                          </>
                        )}
                      </div>
                    </SectionContent>
                  </div>
                  <div
                    className="flex 
                  justify-center md:justify-start
                  items-center uppercase font-medium font-bold
                  md:px-8 md:pt-[15px] 
                  text-[12px] samsungS8:text-[14px] md:text-[19px]"
                  >
                    You have xx&nbsp;
                    <Image
                      src="/assets/Reserve/pendant.svg"
                      width={29}
                      height={29}
                      alt="not found image"
                    />{" "}
                    | Reserve a pass for xx&nbsp;{" "}
                    <Image
                      src="/assets/Reserve/ethereum.svg"
                      width={12}
                      height={20}
                      alt="not found image"
                    />
                  </div>
                  <div className="!px-0 sm:!pl-6 flex justify-center md:justify-start md:mt-[15px]">
                    <div
                      ref={buttonRef}
                      className="flex flex-col md:flex-row items-center md:gap-[15px]"
                    >
                      {signer ? (
                        <Button
                          id="reserve_passport_reserve"
                          className="mt-[20px] md:mt-[15px] py-0 h-[46px] w-[291px] !px-0 flex"
                        >
                          Reserve Passport
                        </Button>
                      ) : (
                        <WalletConnectButton>
                          <Button
                            id="wallet_connect_reserve"
                            className="mt-[20px] md:mt-[15px] py-0 h-[46px] w-[291px] !px-0 flex"
                          >
                            Connect Wallet
                          </Button>
                        </WalletConnectButton>
                      )}
                      <Button
                        id="pay_with_card_reserve"
                        className="mt-[20px] md:mt-[15px] py-0 h-[46px] w-[291px] !px-0"
                      >
                        Pay with credit card
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="justify-center md:flex hidden md:translate-y-[-30px]">
                  {width && (
                    <Media
                      type="image"
                      link="/assets/Claim/Success/pass.svg"
                      containerClasses="rounded-[10px] overflow-hidden z-[1]"
                      containerStyle={{
                        width: isResponsive ? `${(width / 1440) * 465}px` : "465px",
                        height: isResponsive ? `${(width / 1440) * 464}px` : "464px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Footer className="!pt-0 !bg-transparent" />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default ReservePage
