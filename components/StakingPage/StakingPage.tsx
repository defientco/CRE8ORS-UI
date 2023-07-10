import { useMeasure } from "react-use"
import { useRef } from "react"
import { useMediaQuery, useReadLocalStorage } from "usehooks-ts"
import Layout from "../Layout"
import Footer from "../Footer"
import { useTheme } from "../../providers/ThemeProvider"
import useGradualFadeEffect from "../../hooks/useGradualFade"
import Title from "./Title"
import Content from "./Content"
import { Button } from "../../shared/Button"

const StakingPage = () => {
  const [containerRef, { width }] = useMeasure()
  const isResponsive = useMediaQuery("(max-width: 1440px)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isScrollUp = useReadLocalStorage<boolean>("isScrollUp")
  const { themeMode } = useTheme()
  const titleRef = useRef()
  const contentRef = useRef()
  const buttonRef = useRef()

  useGradualFadeEffect({
    elements: [
      {
        domObject: contentRef.current,
        type: "child",
      },
      {
        domObject: titleRef.current,
        type: "child",
      },
      {
        domObject: buttonRef.current,
        type: "child",
      },
    ],
    isScrollUp,
  })

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
              height: isResponsive ? `auto` : `${(958 / 1440) * width}px`,
              minHeight: isResponsive ? "100vh" : "",
              backgroundImage:
                // eslint-disable-next-line no-nested-ternary
                themeMode === "light"
                  ? "url('/assets/Claim/white_background.svg')"
                  : isMobile
                  ? "url('/assets/Staking/mobile_background.svg')"
                  : "url('/assets/Staking/background.svg')",
              backgroundSize: isResponsive ? "cover" : "cover",
              // eslint-disable-next-line no-nested-ternary
              backgroundPosition: isResponsive
                ? isMobile
                  ? `bottom center`
                  : `bottom right`
                : `center`,
            }}
          >
            <div
              className="max-w-[1280px] flex-grow flex flex-col justify-end md:flex-row items-center 
            pb-[150px] samsungS8:pb-[200px] xs:pb-[250px] md:pb-0 relative z-[100]"
            >
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="flex justify-center items-center md:justify-start">
                  <div className="dark:bg-[#00000069] rounded-[20px] py-[40px]">
                    <div ref={titleRef}>
                      <Title
                        text={`The Warehouse\nis Where All the\nCre8ors... Create`}
                        className="leading-[102.3%]
                        !px-6 md:!px-12 md:!pb-6
                        text-center md:text-left"
                      />
                    </div>
                    <div className="flex justify-center" ref={contentRef}>
                      <Content
                        content={
                          isMobile
                            ? `Enter the warehouse by soft-staking\nyour Cre8ors to begin unlocking it's AI\ntraining, collecting badges, and earning\nrewards(like access to new dApps,\nmerch, and more.)`
                            : `Enter the warehouse by soft-staking your Cre8or to begin\nunlocking it's AI training, collecting badges, and earning\nrewards(like access to new dApps, merch, and more.)`
                        }
                        className="leading-[102.3%] 
                            !p-6 md:!px-12 md:!pb-6
                            text-center md:text-left"
                      />
                    </div>
                    <div
                      className="absolute md:relative w-full !p-4 md:!px-12
                        flex justify-center md:justify-start
                    "
                    >
                      <Button
                        id="stake_btn"
                        className="w-[265px] h-[37px] samsungS8:w-[280px] samsungS8:h-[40px] md:w-[291px] md:h-[46px]"
                      >
                        Stake your nft
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer className="!pt-0 !pb-0 !bg-transparent" />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StakingPage
