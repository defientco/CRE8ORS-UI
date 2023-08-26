import { createHandler, Get, Query } from "next-api-decorators"
import metadata from "../../../../../public/metadata/metadata.json"
import getMetadata from "../../../../../lib/getMetadata"

class GetMetadata {
  @Get()
  async metadata(@Query("tokenId") tokenId: string) {
    const response = getMetadata(tokenId)
    console.log("SWEETS GetMetadata API response", response)
    return response
  }
}

export default createHandler(GetMetadata)
