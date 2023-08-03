export interface ProfileViewProps {
  saveProfile: () => Promise<void>
  editedUserName: string
  handleEditedUserName: (e: any) => void
  handleEditable: (isEdiable: boolean) => void
  editedTwitterHandle: string
  handleEditedTwitterHandle: (e: any) => void
  editedLocation: string
  handleEditedLocation: (e: any) => void
  editedBio: string
  handleEditedBio: (e: any) => void
  editedAskedMeAbout: string
  handleEditedAskedMeAbout: (e: any) => void
  editedINeedHelpWith: string
  handleINeedHelpWith: (e: any) => void
  isEditable: boolean
  handleExpandMore: (isExpanded: boolean) => void
  expandedMore: boolean
  loading: boolean
}

export interface TwitterLocationProps {
  handleEditable: () => void
  isEditable: boolean
  editedTwitterHandle: string
  handleEditedTwitterHandle: (e: any) => void
  editedLocation: string
  handleEditedLocation: (e: any) => void
}

export interface ProfileInformationProps {
  editedBio: string
  handleEditedBio: (e: any) => void
  editedAskedMeAbout: string
  handleEditedAskedMeAbout: (e: any) => void
  editedINeedHelpWith: string
  handleINeedHelpWith: (e: any) => void
  isEditable: boolean
}
