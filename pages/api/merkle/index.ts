import { createHandler, Get, Query } from "next-api-decorators"
import generateMerkleProof from "../../../lib/merkle/generateMerkleProof"

class AllData {
  @Get()
  async getMerkleProof(@Query("address") address: string) {
    const proof = generateMerkleProof(address)
    return proof
  }
}

export default createHandler(AllData)
