import { createHandler, Get, Query } from "next-api-decorators"
import metadata from "../../../../../public/metadata/metadata.json"

class GetMetadata {
  @Get()
  async getMerkle(@Query("tokenId") tokenId: string) {

    return { ...metadata.data[tokenId] }
  }
}

export default createHandler(GetMetadata)
