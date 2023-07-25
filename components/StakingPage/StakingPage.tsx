import { useMeasure } from "react-use"
import { useMediaQuery } from "usehooks-ts"
import { useState } from "react"
import Layout from "../Layout"
import Footer from "../Footer"
import { useTheme } from "../../providers/ThemeProvider"
import Media from "../../shared/Media"
import StartTraining from "./StartTranning"
import { STATUS } from "./Status"
import LetsBegin from "./LetsBegin"
import Loading from "./Loading"
import SaveProfile from "./SaveProfile"
import Character from "./Character"

const StakingPage = () => {
  const [containerRef, { width }] = useMeasure()
  const isResponsive = useMediaQuery("(max-width: 1440px)")
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { themeMode } = useTheme()

  const [step, setStep] = useState<string>(STATUS.START)

  const handleStep = (currentStep: string) => {
    setStep(currentStep)
  }

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
                  link="/assets/Staking/mobile_character.svg"
                  blurLink="/assets/Staking/mobile_character.png"
                  type="image"
                  containerStyle={{
                    width: `${width}px`,
                    height: `${(width / 430) * 397}px`,
                  }}
                />
              </div>
            </div>
            {step === STATUS.START && <StartTraining handleStep={handleStep} />}
            {step === STATUS.SELECT && <LetsBegin handleStep={handleStep} />}
            {step === STATUS.TXLOADING && (
              <Loading
                content={`Approve staking transaction\nin wallet to start training\nyour Cre8or.`}
              />
            )}
            {step === STATUS.SAVELOADING && <Loading content="Saving profile..." />}
            {step === STATUS.PROFILE && <SaveProfile handleStep={handleStep} />}
            <Footer className="!pt-0 !pb-0 !bg-transparent relative z-[10]" />
          </div>
        )}
        <Character
          link="/assets/Staking/character.svg"
          originWidth={691}
          originHeight={668}
          className="!absolute bottom-0 right-0 z-[10] hidden md:block"
          screenWidth={1440}
          blurLink="/assets/Staking/character.png"
        />
      </div>
    </Layout>
  )
}

export default StakingPage
