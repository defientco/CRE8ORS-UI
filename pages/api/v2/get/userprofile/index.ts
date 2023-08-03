import { Query, createHandler, Get } from "next-api-decorators"
import { getUserProfile } from "../../../../../helpers/userProfile.db"

class GetUserProfile {
  @Get()
  async get(@Query("username") username: string) {
    const doc = await getUserProfile(username)
    return doc
  }
}

export default createHandler(GetUserProfile)
