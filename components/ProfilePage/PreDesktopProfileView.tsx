import { useState } from "react"
import Media from "../../shared/Media"
import Tooltip from "../../shared/Tooltip"
import PreTwitterLocation from "./Desktop/PreReveal/PreTwitterLocation"
import PrePFPInformation from "./Desktop/PreReveal/PrePFPInformation"
import PreProfileInformation from "./Desktop/PreReveal/PreProflileInformation"
import PreSimilarProfiles from "./Desktop/PreReveal/PreSimilarProfiles"
import PreWalletCollection from "./PreWalletCollection"
import DNALoading from "./Desktop/PreReveal/DNALoading"

const PreDesktopProfileView = () => {
  const [expandedMore, setExpandedMore] = useState(false)

  return (
    <div
      className="relative w-full
        bg-[white]
        rounded-[10px]
        overflow-hidden"
    >
      <DNALoading />
      <div
        className={`relative z-[3] left-0 top-0 w-full h-full
            flex flex-col
            pt-6`}
      >
        <div className="w-full flex justify-between items-center px-10">
          <div className="font-eigerdals text-[75px]">Stargirl</div>
          <div className="flex items-center gap-x-[10px]">
            <div
              className="w-[26px] h-[26px] bg-[black] 
                        flex items-center justify-center
                        drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                        rounded-[3px] cursor-pointer"
            >
              <Media
                type="image"
                link="/assets/Profile/white_home.svg"
                blurLink="/assets/Profile/white_home.png"
                containerClasses="w-[17px] h-[17px]"
              />
            </div>
            <Tooltip
              id="comming_soon_btn"
              message="BADGES,<br />EMBLEMS, &<br />AWARDS<br />COMING SOON"
              place="top"
              style={{
                backgroundColor: "#DADADA",
                color: "black",
                fontFamily: "quicksand",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              <div
                className="w-[26px] h-[26px] bg-[white] 
                            flex items-center justify-center
                            drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                            rounded-[3px] cursor-pointer"
              >
                <Media
                  type="image"
                  link="/assets/Profile/three_dot.svg"
                  blurLink="/assets/Profile/three_dot.png"
                  containerClasses="w-[17px] h-[17px]"
                />
              </div>
            </Tooltip>
          </div>
        </div>
        <div className="w-full flex justify-between items-start px-10">
          <div className="flex flex-col">
            <PreTwitterLocation />
            <div
              className={`flex ${
                expandedMore ? "items-end gap-x-[35px]" : "items-center"
              } pt-[70px]`}
            >
              <PrePFPInformation />
            </div>
          </div>
          <div className="flex flex-col gap-y-[40px]">
            <PreProfileInformation />
            <PreSimilarProfiles />
          </div>
        </div>
        <PreWalletCollection
          handleExpandMore={(expanded: boolean) => setExpandedMore(expanded)}
          expandMore={expandedMore}
        />
      </div>
    </div>
  )
}

export default PreDesktopProfileView
