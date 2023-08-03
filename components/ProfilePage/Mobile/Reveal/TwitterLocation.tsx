import { FC } from "react"
import Media from "../../../../shared/Media"

import { TwitterLocationProps } from "../../interface"
import { useUserProvider } from "../../../../providers/UserProvider"

const TwitterLocation: FC<TwitterLocationProps> = ({
  isEditable,
  handleEditedTwitterHandle,
  editedTwitterHandle,
  editedLocation,
  handleEditedLocation,
}) => {
  const { userInfo } = useUserProvider()

  return (
    <div className="flex items-center justify-center gap-x-[10px] pt-[5px]">
      <div className="flex items-center gap-x-[5px]">
        <Media
          type="image"
          link="/assets/Profile/black_twitter.svg"
          blurLink="/assets/Profile/black_twitter.png"
          containerClasses="w-[20px] h-[16px]"
        />
        {isEditable ? (
          <input
            className="relative z-[105] 
        text-[12px] leading-[99.3%] 
        font-quicksand font-bold
        w-[80px]
        ring-0 outline-none
        border-[lightgray] border-[1px]
        bg-[#D9D9D9]
        px-[3px] py-[2px]
        rounded-[4px]"
            onChange={handleEditedTwitterHandle}
            value={editedTwitterHandle}
          />
        ) : (
          <p className="font-quicksand font-bold text-[12px] leading-[99.3%]">
            @{userInfo?.twitterHandle || ""}
          </p>
        )}
      </div>
      <div className="flex items-center gap-x-[5px]">
        <Media
          type="image"
          link="/assets/Profile/black_location.svg"
          blurLink="/assets/Profile/black_location.png"
          containerClasses="w-[23px] h-[23px]"
        />
        {isEditable ? (
          <input
            className="relative z-[105] 
        text-[12px] leading-[99.3%] 
        font-quicksand font-bold
        w-[90px]
        ring-0 outline-none
        border-[lightgray] border-[1px]
        bg-[#D9D9D9]
        px-[3px] py-[2px]
        rounded-[4px]"
            onChange={handleEditedLocation}
            value={editedLocation}
          />
        ) : (
          <p className="font-quicksand font-bold text-[12px] leading-[99.3%]">
            {userInfo?.location || ""}
          </p>
        )}
      </div>
    </div>
  )
}

export default TwitterLocation
