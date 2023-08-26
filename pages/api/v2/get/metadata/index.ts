import { createHandler, Get, Query } from "next-api-decorators"
import getMetadata from "../../../../../lib/getMetadata"

class GetMetadata {
  @Get()
  async metadata(@Query("tokenId") tokenId: string) {
    return getMetadata(tokenId)
  }
}

export default createHandler(GetMetadata)
