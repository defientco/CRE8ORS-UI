import UserProfile from "../Models/UserProfile"
import dbConnect from "../utils/db"

export interface UserProfile {
  username: string
  bio?: string
  twitterHandle?: string
  location?: string
  iNeedHelpWith?: string
  askMeAbout?: string
}

export const userNameExists = async (username: string) => {
  try {
    await dbConnect()
    const doc = await UserProfile.countDocuments({ username })
    if (doc > 0) {
      return true
    }
    return false
  } catch (e) {
    throw new Error(e)
  }
}
export const addUserProfile = async (body: UserProfile) => {
  const userAlreadyExists = await userNameExists(body.username)
  if (userAlreadyExists) {
    return { success: false, message: "User already exists" }
  }
  try {
    await dbConnect()
    const result = await UserProfile.create(body)
    return { success: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const updateUserProfile = async (body: UserProfile) => {
  try {
    await dbConnect()
    const doc = await UserProfile.findOne({ username: body.username }).lean()
    if (!doc) {
      throw new Error("No user found")
    }
    const results = await UserProfile.findOneAndUpdate({ username: body.username }, body)
    return { success: true, results }
  } catch (e) {
    throw new Error(e)
  }
}

export const getUserProfile = async (username: string) => {
  try {
    await dbConnect()
    const doc = await UserProfile.findOne({ username }).lean()
    return { success: true, doc }
  } catch (e) {
    console.log('here')
    throw new Error(e)
  }
}
