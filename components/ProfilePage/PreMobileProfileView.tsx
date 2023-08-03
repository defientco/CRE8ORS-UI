import { FC } from "react"
import Media from "../../shared/Media"
import PreProfileInformation from "./Desktop/PreReveal/PreProflileInformation"
import TwitterLocation from "./Mobile/Reveal/TwitterLocation"
import PreSimilarProfiles from "./Mobile/PreReveal/PreSimilarProfiles"
import PreWalletCollection from "./PreWalletCollection"
import DNALoading from "./DNALoading"
import { ProfileViewProps } from "./interface"
import { useUserProvider } from "../../providers/UserProvider"

const PreMobileProfileView: FC<ProfileViewProps> = ({
  // saveProfile,
  editedUserName,
  handleEditedUserName,
  handleEditable,
  editedTwitterHandle,
  handleEditedTwitterHandle,
  editedLocation,
  handleEditedLocation,
  editedBio,
  handleEditedBio,
  editedAskedMeAbout,
  handleEditedAskedMeAbout,
  editedINeedHelpWith,
  handleINeedHelpWith,
  isEditable,
  handleExpandMore,
  expandedMore,
  // loading,
}) => {
  const { userInfo } = useUserProvider()

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
        {isEditable ? (
          <div className="flex justify-center">
            <input
              className="relative z-[105] 
          text-[40px] leading-[99.3%] 
          font-eigerdals font-bold
          w-[190px]
          ring-0 outline-none
          border-[lightgray] border-[1px]
          bg-[#D9D9D9]
          px-[10px] py-[2px]
          rounded-[4px]"
              onChange={handleEditedUserName}
              value={editedUserName}
            />{" "}
          </div>
        ) : (
          <div className="font-eigerdals text-[40px] text-center">{userInfo?.username || ""}</div>
        )}
        <TwitterLocation
          handleEditable={() => handleEditable(true)}
          isEditable={isEditable}
          editedTwitterHandle={editedTwitterHandle}
          handleEditedTwitterHandle={handleEditedTwitterHandle}
          editedLocation={editedLocation}
          handleEditedLocation={handleEditedLocation}
        />
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
            onClick={() => handleEditable(!isEditable)}
          >
            <Media
              type="image"
              link="/assets/Profile/edit.svg"
              blurLink="/assets/Profile/edit.png"
              containerClasses="w-[17px] h-[17px]"
            />
          </button>
        </div>
        <DNALoading />

        <PreProfileInformation
          editedAskedMeAbout={editedAskedMeAbout}
          editedINeedHelpWith={editedINeedHelpWith}
          editedBio={editedBio}
          handleEditedAskedMeAbout={handleEditedAskedMeAbout}
          handleINeedHelpWith={handleINeedHelpWith}
          handleEditedBio={handleEditedBio}
          isEditable={isEditable}
        />
        <PreSimilarProfiles />

        <PreWalletCollection
          handleExpandMore={(expanded: boolean) => handleExpandMore(expanded)}
          expandMore={expandedMore}
        />
      </div>
    </div>
  )
}

export default PreMobileProfileView
