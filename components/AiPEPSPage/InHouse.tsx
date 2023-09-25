import { useMediaQuery } from "usehooks-ts"
import SectionContainer from "./SectionContainer"
import Title from "../Common/Title"
import Content from "../Common/Content"
import Media from "../../shared/Media"

const InHouse = () => {
  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <SectionContainer>
      <div className="relative w-full h-[550px] xl:h-[960px] flex justify-center items-center">
        <div
          className="grid  
                grid-cols-1 xl:grid-cols-2 
                xl:gap-[20px] 2xl:gap-x-[150px]"
        >
          <div className="w-[100%] flex justify-center pb-[56px]">
            <Media
              link={
                isXl
                  ? "/assets/AiPEPS/InHouse/mobile_character.svg"
                  : "/assets/AiPEPS/InHouse/character.svg"
              }
              blurLink={
                isXl
                  ? "/assets/AiPEPS/InHouse/mobile_character.svg"
                  : "/assets/AiPEPS/InHouse/character.svg"
              }
              type="image"
              containerClasses="xl:w-[470px] xl:h-[798px]
              w-[273px] h-[340px]"
            />
          </div>
          <div className="flex flex-col justify-center">
            <Title
              text={
                isXl ? `IP Management and\nLicensing` : `Not Just a JPEG.\nThink, PFP’s as a\nService (PaaS)`
              }
              className="leading-[103.3%] 
              text-center xl:text-right
              !text-[22px] xs:!text-[27px] xl:!text-[65px]"
            />
            <Content
              content={
                isXl
                  ? `We believe IP is one of the most valuable utilities for NFT\nholders, so why stop at just the artwork? Our dedicated IP\nmanagment department will help you license your Cre8ors IP.\nFrom the PFP artwork to all the co-creations you make with\nthe community, Cre8ors mission is to unleash the creative\npotential and unlock financial freedom for our members.`
                  : `We believe IP is one of the most valuable utilities for NFT\nholders, so why stop at just the artwork? Our in-house IP\nmanagement and licensing department can help you license\nyour Cre8ors IP. From the artwork to the co-creations you make\nwith the community, Cre8ors mission is to unleash your creative\npotential and unlock financial freedom for our members.`
              }
              className="leading-[103.3%]
              pt-[10px] xl:pt-[27px]
              text-center xl:text-right
              !text-[10px] samsungS8:!text-[11px] xs:!text-[12px] xl:!text-[19px]"
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default InHouse
