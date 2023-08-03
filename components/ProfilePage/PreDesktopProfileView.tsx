import { useEffect, useState } from "react"
import Media from "../../shared/Media"
import Tooltip from "../../shared/Tooltip"
import PreTwitterLocation from "./Desktop/PreReveal/PreTwitterLocation"
import PrePFPInformation from "./Desktop/PreReveal/PrePFPInformation"
import PreProfileInformation from "./Desktop/PreReveal/PreProflileInformation"
import PreSimilarProfiles from "./Desktop/PreReveal/PreSimilarProfiles"
import PreWalletCollection from "./PreWalletCollection"
import DNALoading from "./DNALoading"
import { Button } from "../../shared/Button"
import { useUserProvider } from "../../providers/UserProvider"

const PreDesktopProfileView = () => {
  const { userInfo } = useUserProvider()

  const [expandedMore, setExpandedMore] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [editedUserName, setEditedUserName] = useState("")

  useEffect(() => {
    if (userInfo) {
      setEditedUserName(userInfo.username)
    }
  }, [isEditable, userInfo])

  return (
    <div
      className="relative w-full
        bg-[white]
        rounded-[10px]
        overflow-hidden"
    >
      {!isEditable && <DNALoading />}
      <div
        className={`relative z-[3] left-0 top-0 w-full h-full
            flex flex-col
            pt-6`}
      >
        {isEditable && <DNALoading className="!z-[104]" />}
        <div className="w-full flex justify-between items-center px-10">
          {isEditable ? (
            <>
              <input
                className="relative z-[105] 
            font-eigerdals text-[75px] w-[320px]
            ring-0 outline-none
            border-[lightgray] border-[1px]
            mb-[20px]
            px-[10px] py-[5px]
            leading-[110.3%]
            rounded-[10px]"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                type="text"
              />
              <Button
                id="save_profile_button"
                className="!z-[105] !relative !bg-[black] !text-[white]"
              >
                save profile
              </Button>
              <div
                className="absolute w-full h-full
            left-0 top-0 backdrop-blur-[2px] z-[80]"
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
            <PreTwitterLocation handleEditable={() => setIsEditable(true)} />
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
