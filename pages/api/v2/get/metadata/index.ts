import { createHandler, Get, Query } from "next-api-decorators"
import getMetadata from "../../../../../lib/getMetadata"
import isSmartWalletRegistered from "../../../../../lib/isSmartWalletRegistered"

class GetMetadata {
  @Get()
  async metadata(@Query("tokenId") tokenId: string) {
    const hasTBA = await isSmartWalletRegistered(tokenId)
    return getMetadata(tokenId, hasTBA)
  }
}

export default createHandler(GetMetadata)
