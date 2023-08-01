import { useState } from "react"
import Media from "../../shared/Media"
import PreProfileInformation from "./Desktop/PreReveal/PreProflileInformation"
import TwitterLocation from "./Mobile/Reveal/TwitterLocation"
import PFPImage from "./Mobile/Reveal/PFPImage"
import PreSimilarProfiles from "./Mobile/PreReveal/PreSimilarProfiles"
import PreWalletCollection from "./PreWalletCollection"

const PreMobileProfileView = () => {
  const [expandedMore, setExpandedMore] = useState(false)

  return (
    <div
      className="relative w-full
        bg-[white]
        rounded-[10px]
        overflow-hidden"
    >
      <div
        className={`relative z-[3] left-0 top-0 w-full h-full
            flex flex-col
            pt-6`}
      >
        <div className="font-eigerdals text-[40px] text-center">Stargirl</div>
        <TwitterLocation />
        <div className="w-full flex justify-center items-center px-10 gap-x-[10px] pt-[15px]">
          <div
            className="w-[26px] h-[26px] bg-[#DBDBDB] 
                        flex items-center justify-center
                        rounded-[3px] cursor-pointer"
          >
            <Media
              type="image"
              link="/assets/Profile/home.svg"
              blurLink="/assets/Profile/home.png"
              containerClasses="w-[17px] h-[17px]"
            />
          </div>
          <div
            className="w-[26px] h-[26px] bg-[#DBDBDB] 
                        flex items-center justify-center
                        rounded-[3px] cursor-pointer"
          >
            <Media
              type="image"
              link="/assets/Profile/three_dot.svg"
              blurLink="/assets/Profile/three_dot.png"
              containerClasses="w-[17px] h-[17px]"
            />
          </div>
          <button
            className="w-[26px] h-[26px] bg-[#DBDBDB]
                        flex items-center justify-center
                        rounded-[2px] cursor-pointer"
            type="button"
          >
            <Media
              type="image"
              link="/assets/Profile/edit.svg"
              blurLink="/assets/Profile/edit.png"
              containerClasses="w-[17px] h-[17px]"
            />
          </button>
        </div>
        <PFPImage />

        <PreProfileInformation />
        <PreSimilarProfiles />

        <PreWalletCollection
          handleExpandMore={(expanded: boolean) => setExpandedMore(expanded)}
          expandMore={expandedMore}
        />
      </div>
    </div>
  )
}

export default PreMobileProfileView
