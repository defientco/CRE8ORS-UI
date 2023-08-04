import { createContext, useState, useEffect, useMemo, useContext } from "react"

import { useRouter } from "next/router"
import { useUserProvider } from "./UserProvider"
import { updateUserInfo } from "../lib/userInfo"

const ProfileContext = createContext<Partial<any> | null>(null)

export const ProfileProvider = ({ children }) => {
  const router = useRouter()

  const { address } = router.query

  const { userInfo, getUserData } = useUserProvider()

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

    if (response) await getUserData(address as string)
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

  const provider = useMemo(
    () => ({
      editedAskedMeAbout,
      editedUserName,
      editedBio,
      editedINeedHelpWith,
      editedLocation,
      editedTwitterHandle,
      expandedMore,
      isEditable,
      handleExpandedMore,
      handleEditedUserName,
      handleEditedAskedMeAbout,
      handleEditedBio,
      handleEditedINeedHelpWith,
      handleEditedTwitterHandle,
      handleEditedLocation,
      handleEditable,
      saveProfile,
      loading,
    }),
    [
      editedAskedMeAbout,
      editedUserName,
      editedBio,
      editedINeedHelpWith,
      editedLocation,
      editedTwitterHandle,
      expandedMore,
      isEditable,
      handleExpandedMore,
      handleEditedUserName,
      handleEditedAskedMeAbout,
      handleEditedBio,
      handleEditedINeedHelpWith,
      handleEditedTwitterHandle,
      handleEditedLocation,
      handleEditable,
      saveProfile,
      loading,
    ],
  )

  return <ProfileContext.Provider value={provider}>{children}</ProfileContext.Provider>
}

export const useProfileProvider = () => useContext(ProfileContext)
