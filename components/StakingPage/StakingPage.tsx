import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import Layout from "../Layout"
import Footer from "../Footer"
import { useTheme } from "../../providers/ThemeProvider"
import Title from "./Title"
import Content from "./Content"
import { Button } from "../../shared/Button"
import Media from "../../shared/Media"

const StakingPage = () => {
  const [containerRef, { width }] = useMeasure()
  const isResponsive = useMediaQuery("(max-width: 1440px)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { themeMode } = useTheme()

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
              height: isResponsive ? `1000px` : `${(1000 / 1440) * width}px`,
              minHeight: isResponsive ? "100vh" : "",
              backgroundImage:
                // eslint-disable-next-line no-nested-ternary
                themeMode === "light"
                  ? "url('/assets/Claim/white_background.svg')"
                  : isMobile
                  ? "url('/assets/Staking/mobile_background.png')"
                  : "url('/assets/Staking/background.png')",
              backgroundSize: "cover",
              // eslint-disable-next-line no-nested-ternary
              backgroundPosition: isResponsive
                ? isMobile
                  ? `bottom center`
                  : `bottom right`
                : `center`,
            }}
          >
            <div className="absolute left-0 bottom-0 z-[0] hidden dark:block dark:md:hidden">
              <div
                style={{
                  width: `${width}px`,
                  height: `${(width / 430) * 397}px`,
                }}
              >
                <Media
                  link="/assets/Staking/character.png"
                  blurLink="/assets/Staking/character.png"
                  type="image"
                  containerStyle={{
                    width: `${width}px`,
                    height: `${(width / 430) * 397}px`,
                  }}
                />
              </div>
            </div>
            <div
              className="max-w-[1280px] flex-grow flex flex-col justify-end md:flex-row items-center 
            pb-[180px] samsungS8:pb-[220px] xs:pb-[290px] md:pb-0 relative z-[100]"
            >
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="flex justify-center items-center md:justify-start">
                  <div className="dark:bg-[#00000069] rounded-[20px] pt-[40px] pb-[20px] md:py-[40px]">
                    <Title
                      text={`The Warehouse\nis Where All the\nCre8ors... Create`}
                      className="leading-[102.3%]
                      !px-6 md:!px-12 md:!pb-6
                      text-center md:text-left fade_in_text"
                    />
                    <div className="flex justify-center fade_in_text">
                      <Content
                        content={
                          !isMobile
                            ? `Just outside the Black & White city stands The Warehouse.\nAn abandoned imagination factory that the Cre8ors call\nhome. This is their safe haven and HQ. A place for free-\nthinking, art, ingenuity and experimentation.`
                            : `Just outside the Black & White city\nstands The Warehouse. An abandoned\nimagination factory that the Cre8ors\ncall home. This is their safe haven and\nHQ. A place for free-thinking, art,\ningenuity and experimentation.`
                        }
                        className="leading-[102.3%] 
                            !p-4 md:!px-12 md:!pb-6
                            text-center md:text-left"
                      />
                    </div>
                    <div className="flex justify-center fade_in_text">
                      <Content
                        content={
                          isMobile
                            ? `Enter the warehouse by soft-staking\nyour Cre8ors to begin unlocking it's AI\ntraining, collecting badges, and earning\nrewards(like access to new dApps,\nmerch, and more.)`
                            : `Enter the warehouse by soft-staking your Cre8or to begin\nunlocking it's AI training, collecting badges, and earning\nrewards(like access to new dApps, merch, and more.)`
                        }
                        className="leading-[102.3%] 
                            !p-4 md:!px-12 md:!pb-6
                            text-center md:text-left"
                      />
                    </div>
                    <div
                      className="relative w-full !p-4 md:!px-12
                        flex justify-center md:justify-start fade_in_text
                    "
                    >
                      <Button
                        id="stake_btn"
                        className="w-[265px] h-[69px] samsungS8:w-[280px] md:w-[291px] md:h-[46px]"
                      >
                        {isMobile ? (
                          <>
                            Enter the
                            <br />
                            warehouse
                          </>
                        ) : (
                          "Enter the warehouse"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer className="!pt-0 !pb-0 !bg-transparent relative z-[10]" />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default StakingPage
