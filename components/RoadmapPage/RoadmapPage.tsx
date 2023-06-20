import { EffectCreative, Autoplay } from "swiper"
import Slider from "../../shared/Slider"
import Stage from "./Stage"
import Layout from "../Layout"
import { StageData } from "./types"

const RoadmapPage = () => {
  const stages: StageData[] = [
    {
      backImg: "/assets/Roadmap/mission.svg",
      label: "Mission & Vision",
      date: "2023-01-31",
    },
    {
      backImg: "/assets/Roadmap/curate.svg",
      label: "Curate collective",
      date: "2023-02-28",
    },
    {
      backImg: "/assets/Roadmap/pendants.svg",
      label: "Airdrop pendants",
      date: "2023-03-31",
    },
    {
      backImg: "/assets/Roadmap/build.svg",
      label: "Build in public",
      date: "2023-04-30",
    },
    {
      backImg: "/assets/Roadmap/leaderboard.svg",
      label: "Leaderboard",
      date: "2023-05-31",
    },
    {
      backImg: "/assets/Roadmap/claim.svg",
      label: "Claim tickets",
      date: "2023-06-01",
    },
    {
      backImg: "/assets/Roadmap/redeem.svg",
      label: "Redeem passports",
      date: "2023-06-30",
    },
    {
      backImg: "/assets/Roadmap/allowlist.svg",
      label: "Allowlist quiz",
      date: "2023-07-01",
    },
    {
      backImg: "/assets/Roadmap/drop.svg",
      label: "drop trailer",
      date: "2023-07-07",
    },
    {
      backImg: "/assets/Roadmap/everything.svg",
      label: "everything crop hack",
      date: "2023-07-14",
    },
    {
      backImg: "/assets/Roadmap/dna.svg",
      label: "dna distribution",
      date: "2023-07-21",
    },
    {
      backImg: "/assets/Roadmap/mint.svg",
      label: "Cre8ors mint",
      date: "2023-07-27",
    },
    {
      backImg: "/assets/Roadmap/art.svg",
      label: "art reveal",
      date: "2023-08-31",
    },
    {
      backImg: "/assets/Roadmap/creating.svg",
      label: "creating",
      date: "2023-09-30",
    },
    {
      backImg: "/assets/Roadmap/collaborating.svg",
      label: "collaborating",
      date: "2023-10-31",
    },
    {
      backImg: "/assets/Roadmap/connecting.svg",
      label: "connecting",
      date: "2023-11-30",
    },
    {
      backImg: "/assets/Roadmap/redacted.svg",
      label: null,
      date: null,
    },
  ]

  return (
    <Layout type="contained">
      <div className="flex justify-center mt-[150px]">
        <Slider
          className="!h-[840px] [&>.swiper-wrapper]:mt-[280px]"
          slideClassName="!h-[280px]"
          sliderProps={{
            initialSlide: 1,
            slidesPerView: 3,
            direction: "vertical",
            effect: "creative",
            loop: true,
            autoplay: true,
            speed: 1200,
            modules: [EffectCreative, Autoplay],
            creativeEffect: {
              next: {
                translate: [0, "280px", 0],
                scale: 0.8,
                opacity: 0.7,
              },
              prev: {
                translate: [0, "-280px", 0],
                scale: 0.8,
                opacity: 0.7,
              },
              limitProgress: 2,
            },
          }}
        >
          {stages.map((stage: StageData, index: number) => (
            <Stage key={stage.backImg} stageData={stage} stageNumber={index + 1} />
          ))}
        </Slider>
      </div>
    </Layout>
  )
}

export default RoadmapPage
