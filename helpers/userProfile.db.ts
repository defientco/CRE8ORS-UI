import UserProfile from "../Models/UserProfile"
import dbConnect from "../utils/db"

export interface UserProfile {
  walletAddress: string
  username?: string
  bio?: string
  twitterHandle?: string
  location?: string
  iNeedHelpWith?: string
  askMeAbout?: string
}

const getFilterObject = (value) => ({
  $regex: value,
  $options: "i"
})

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

export const userProfileExists = async (walletAddress: string) => {
  try {
    await dbConnect()
    const doc = await UserProfile.countDocuments({ walletAddress: getFilterObject(walletAddress) })
    if (doc > 0) {
      return true
    }
    return false
  } catch (e) {
    throw new Error(e)
  }
}
export const addUserProfile = async (body: UserProfile) => {
  try {
    await dbConnect()

    const isExited = await userProfileExists(body.walletAddress)

    if(isExited) {
      throw new Error("User profile already existed!")
    }

    const result = await UserProfile.create({
      ...body,
      walletAddress: body.walletAddress?.toLowerCase()
    })
    return { success: true, result }
  } catch (e) {
    throw new Error(e)
  }
}

export const updateUserProfile = async (body: UserProfile) => {
  try {
    await dbConnect()

    const doc = await UserProfile.findOne({ walletAddress: getFilterObject(body.walletAddress) }).lean()
    if (!doc) {
      throw new Error("No user found")
    }

    const isExitedUserName = await userNameExists(body.username)

    if(isExitedUserName) {
      throw new Error("User name already existed!")
    }
    
    const results = await UserProfile.findOneAndUpdate({ walletAddress: getFilterObject(body.walletAddress) }, body)
    return { success: true, results }
  } catch (e) {
    throw new Error(e)
  }
}

export const getUserProfile = async (walletAddress: string) => {
  try {
    await dbConnect()

    const doc = await UserProfile.findOne({ walletAddress: getFilterObject(walletAddress) }).lean()
    return { success: true, doc }
  } catch (e) {
    throw new Error(e)
  }
}

export const getSimilarProfiles = async (walletAddress: string) => {
  try {
    await dbConnect()
    const userProfile = await UserProfile.findOne({walletAddress: getFilterObject(walletAddress)}).lean()
   
    if (!userProfile?.location) return { success:true, similarProfiles: [] } 
    const location = userProfile.location

    const doc = await UserProfile.find({
      $and: [
        {
          location: location.replace(/[\s,]/g, ""),
        },
        {
          walletAddress: { $ne: walletAddress?.toLowerCase() }
        },
      ],
    }).lean()

    return { success: true, similarProfiles: doc }
  } catch(e) {
    throw new Error(e)  
  }
}
