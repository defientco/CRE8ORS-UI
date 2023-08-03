import { FC } from "react"
import Media from "../../shared/Media"
import Tooltip from "../../shared/Tooltip"
import PreTwitterLocation from "./Desktop/PreReveal/PreTwitterLocation"
import PrePFPInformation from "./Desktop/PreReveal/PrePFPInformation"
import PreProfileInformation from "./Desktop/PreReveal/PreProflileInformation"
import PreSimilarProfiles from "./Desktop/PreReveal/PreSimilarProfiles"
import PreWalletCollection from "./PreWalletCollection"
import DNALoading from "./DNALoading"
import EditPanel from "./EditPanel"
import { useUserProvider } from "../../providers/UserProvider"
import { ProfileViewProps } from "./interface"

const PreDesktopProfileView: FC<ProfileViewProps> = ({
  saveProfile,
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
  loading,
}) => {
  const { userInfo } = useUserProvider()

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
          {isEditable ? (
            <>
              <input
                className="relative z-[105] 
            font-eigerdals text-[75px] w-[320px]
            ring-0 outline-none
            border-[lightgray] border-[1px]
            mb-[20px] bg-[#D9D9D9]
            px-[10px] py-[2px]
            leading-[110.3%]
            rounded-[4px]"
                value={editedUserName}
                onChange={handleEditedUserName}
                type="text"
              />

              <EditPanel
                handleCloseEditingMode={() => handleEditable(false)}
                isExpanded={expandedMore}
                saveProfile={!loading ? saveProfile : async () => {}}
              />
            </>
          ) : (
            <div className="font-eigerdals text-[75px]">{userInfo?.username}</div>
          )}
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
            <PreTwitterLocation
              handleEditable={() => handleEditable(true)}
              isEditable={isEditable}
              editedTwitterHandle={editedTwitterHandle}
              handleEditedTwitterHandle={handleEditedTwitterHandle}
              editedLocation={editedLocation}
              handleEditedLocation={handleEditedLocation}
            />
            <div
              className={`flex ${
                expandedMore ? "items-end gap-x-[35px]" : "items-center"
              } pt-[70px]`}
            >
              <PrePFPInformation />
            </div>
          </div>
          <div className="flex flex-col gap-y-[40px]">
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
          </div>
        </div>
        <PreWalletCollection handleExpandMore={handleExpandMore} expandMore={expandedMore} />
      </div>
    </div>
  )
}

export default PreDesktopProfileView
