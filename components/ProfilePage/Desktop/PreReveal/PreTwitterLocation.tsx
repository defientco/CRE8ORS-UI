import Media from "../../../../shared/Media"
import Tooltip from "../../../../shared/Tooltip"
import { FC } from 'react'

interface PreDesktopProfileViewProps {
  handleEditable: () => void
}

const PreTwitterLocation: FC<PreDesktopProfileViewProps> = ({
  handleEditable
}) => (
  <div className="flex items-center gap-x-[15px]">
    <div className="flex items-center gap-x-[5px]">
      <Media
        type="image"
        link="/assets/Profile/black_twitter.svg"
        blurLink="/assets/Profile/black_twitter.png"
        containerClasses="w-[23px] h-[19px]"
      />
      <p className="font-quicksand font-bold text-[22px] leading-[99.3%]">@mckennarhillier</p>
    </div>
    <div className="flex items-center gap-x-[5px]">
      <Media
        type="image"
        link="/assets/Profile/black_location.svg"
        blurLink="/assets/Profile/black_location.png"
        containerClasses="w-[26px] h-[26px]"
      />
      <p className="font-quicksand font-bold text-[22px] leading-[99.3%]">Denver, CO</p>
    </div>
    <Tooltip
      id="edit_profile"
      message="EDIT PROFILE"
      place="right"
      style={{
        backgroundColor: "#DADADA",
        color: "black",
        fontFamily: "quicksand",
        fontSize: "10px",
        fontWeight: "bold",
      }}
    >
      <button
        className="w-[26px] h-[26px] bg-[white]
              flex items-center justify-center
              drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
              rounded-[2px] cursor-pointer"
        type="button"
        onClick={handleEditable}
      >
        <Media
          type="image"
          link="/assets/Profile/edit.svg"
          blurLink="/assets/Profile/edit.png"
          containerClasses="w-[17px] h-[17px]"
        />
      </button>
    </Tooltip>
  </div>
)

export default PreTwitterLocation
