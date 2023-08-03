import { Schema, model, models, Model } from "mongoose"

interface UserProfile {
  username: string
  bio?: string
  twitterHandle?: string
  location?: string
  iNeedHelpWith?: string
  askMeAbout?: string
}

const UserProfileSchema = new Schema<UserProfile>({
  username: {
    type: String,
    required: [true, "Please add a username"],
  },
  bio: {
    type: String,
    required: [false, "Please add a bio"],
  },
  twitterHandle: {
    type: String,
    required: [false, "Please add a twitter handle"],
  },
  location: {
    type: String,
    required: [false, "Please add a location"],
  },
  iNeedHelpWith: {
    type: String,
    required: [false, "Please add a iNeedHelpWith"],
  },
  askMeAbout: {
    type: String,
    required: [false, "Please add a askMeAbout"],
  },
})

export default (models.UserProfile as Model<UserProfile>) || model("UserProfile", UserProfileSchema)
