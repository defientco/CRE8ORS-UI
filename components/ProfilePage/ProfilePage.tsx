import { useMediaQuery } from "usehooks-ts"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "../Layout"
import PreDesktopProfileView from "./PreDesktopProfileView"
import PreMobileProfileView from "./PreMobileProfileView"
import { useUserProvider } from "../../providers/UserProvider"
import { updateUserInfo } from "../../lib/userInfo"

const ProfilePage = () => {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { userInfo, getUserData } = useUserProvider()
  const { address } = router.query

  const [expandedMore, setExpandedMore] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [editedUserName, setEditedUserName] = useState("")
  const [editedTwitterHandle, setEditedTwitterHandle] = useState("")
  const [editedLocation, setEditedLocation] = useState("")
  const [editedAskedMeAbout, setEditedAskedMeAbout] = useState("")
  const [editedINeedHelpWith, setEditedINeedHelpWith] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [loading, setLoading] = useState(false)

  const saveProfile = async () => {
    setLoading(true)
    const response = await updateUserInfo({
      address,
      twitterHandle: editedTwitterHandle,
      location: editedLocation,
      iNeedHelpWith: editedINeedHelpWith,
      askMeAbout: editedAskedMeAbout,
      bio: editedBio,
      username: editedUserName,
    })

    if (response) await getUserData()
    setLoading(false)
    setIsEditable(false)
  }

  useEffect(() => {
    if (userInfo) {
      setEditedUserName(userInfo.username)
      setEditedTwitterHandle(userInfo.twitterHandle)
      setEditedLocation(userInfo.location)
      setEditedAskedMeAbout(userInfo.askMeAbout)
      setEditedINeedHelpWith(userInfo.iNeedHelpWith)
      setEditedBio(userInfo.bio)
    }
  }, [isEditable, userInfo])

  const handleEditable = (ediable: boolean) => {
    setIsEditable(ediable)
  }

  const handleEditedUserName = (e: any) => {
    setEditedUserName(e.target.value)
  }

  const handleEditedAskedMeAbout = (e: any) => {
    setEditedAskedMeAbout(e.target.value)
  }

  const handleEditedTwitterHandle = (e: any) => {
    setEditedTwitterHandle(e.target.value)
  }

  const handleEditedINeedHelpWith = (e: any) => {
    setEditedINeedHelpWith(e.target.value)
  }

  const handleEditedBio = (e: any) => {
    setEditedBio(e.target.value)
  }

  const handleEditedLocation = (e: any) => {
    setEditedLocation(e.target.value)
  }

  const handleExpandedMore = (isExpanded: boolean) => {
    setExpandedMore(isExpanded)
  }

  return (
    <Layout type="contained">
      <div
        className="relative pt-[8rem] px-2 samsungS8:px-4 lg:px-10
              w-full"
      >
        {isMobile ? (
          <PreMobileProfileView
            saveProfile={saveProfile}
            loading={loading}
            handleEditable={handleEditable}
            handleEditedUserName={handleEditedUserName}
            handleEditedAskedMeAbout={handleEditedAskedMeAbout}
            handleEditedBio={handleEditedBio}
            expandedMore={expandedMore}
            handleExpandMore={handleExpandedMore}
            handleINeedHelpWith={handleEditedINeedHelpWith}
            handleEditedTwitterHandle={handleEditedTwitterHandle}
            handleEditedLocation={handleEditedLocation}
            isEditable={isEditable}
            editedAskedMeAbout={editedAskedMeAbout}
            editedUserName={editedUserName}
            editedLocation={editedLocation}
            editedINeedHelpWith={editedINeedHelpWith}
            editedTwitterHandle={editedTwitterHandle}
            editedBio={editedBio}
          />
        ) : (
          <PreDesktopProfileView
            saveProfile={saveProfile}
            loading={loading}
            handleEditable={handleEditable}
            handleEditedUserName={handleEditedUserName}
            handleEditedAskedMeAbout={handleEditedAskedMeAbout}
            handleEditedBio={handleEditedBio}
            expandedMore={expandedMore}
            handleExpandMore={handleExpandedMore}
            handleINeedHelpWith={handleEditedINeedHelpWith}
            handleEditedTwitterHandle={handleEditedTwitterHandle}
            handleEditedLocation={handleEditedLocation}
            isEditable={isEditable}
            editedAskedMeAbout={editedAskedMeAbout}
            editedUserName={editedUserName}
            editedLocation={editedLocation}
            editedINeedHelpWith={editedINeedHelpWith}
            editedTwitterHandle={editedTwitterHandle}
            editedBio={editedBio}
          />
        )}
      </div>
    </Layout>
  )
}

export default ProfilePage
