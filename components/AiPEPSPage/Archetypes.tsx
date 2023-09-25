import { useMediaQuery } from "usehooks-ts"
import SectionContainer from "./SectionContainer"
import Title from "../Common/Title"
import Content from "../Common/Content"
import Media from "../../shared/Media"

const Archetypes = () => {
  const pfpList = [
    {
      id: "pfp1",
      link: "/assets/AiPEPS/PFP/musician.png",
    },
    {
      id: "pfp2",
      link: "/assets/AiPEPS/PFP/writer.png",
    },
    {
      id: "pfp3",
      link: "/assets/AiPEPS/PFP/photographer.png",
    },
    {
      id: "pfp4",
      link: "/assets/AiPEPS/PFP/designer.png",
    },
    {
      id: "pfp5",
      link: "/assets/AiPEPS/PFP/engineer.png",
    },
    {
      id: "pfp6",
      link: "/assets/AiPEPS/PFP/dancer.png",
    },
    {
      id: "pfp7",
      link: "/assets/AiPEPS/PFP/director.png",
    },
    {
      id: "pfp8",
      link: "/assets/AiPEPS/PFP/thespain.png",
    },
  ]

  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <SectionContainer>
      <div className="relative w-full h-[550px] xl:h-[1000px] flex-col flex justify-center">
        <div className="flex xl:hidden justify-center">
          <div className="grid grid-cols-4 gap-y-[20px] pb-[35px] w-[300px] samsungS8:w-[340px]">
            {pfpList.map((pfp) => (
              <Media
                key={pfp.id}
                link={pfp.link}
                blurLink={pfp.link}
                type="image"
                containerClasses="w-[79px] h-[110px]"
              />
            ))}
          </div>
        </div>
        <div>
          <Title
            text={isXl ? "8 Creative Archetypes" : "An Intelligent PFP,\nHybrid Token + Smart Wallet"}
            className="leading-[103.3%] text-center
                    !text-[22px] xs:!text-[27px] xl:!text-[65px]"
          />
          <Content
            content={
              isXl
                ? `Each PFP comes with a creative DNA card NFT. This card\nrepresents your Cre8ors archetype. Trade your cards to\nchange your archetype without the need to sell your entire\nPFP. Cre8ors PFPs are interactive ERC721C tokens with\nownership of an ERC-6551 smart wallet.`
                : `Cre8ors PFP’s are a new interactive ERC-721ACH hybrid token that comes with ownership of its own\nERC-6551 smart wallet. Each PFP comes with a creative DNA card NFT inside. This card represents your\nCre8ors archetype trait. Trade your cards and change your traits without the need to sell your entire PFP.`
            }
            className="leading-[103.3%] text-center
                  pt-[10px] xl:pt-[27px]
                  !text-[10px] samsungS8:!text-[11px] xs:!text-[12px] xl:!text-[19px]"
          />
        </div>
        <div className="hidden xl:flex justify-center">
          <div className="grid grid-cols-4 gap-y-[20px] pt-[35px] w-[760px]">
            {pfpList.map((pfp) => (
              <Media
                key={pfp.id}
                link={pfp.link}
                blurLink={pfp.link}
                type="image"
                containerClasses="w-[212px] h-[294px]"
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default Archetypes
