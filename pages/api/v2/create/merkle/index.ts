import { createHandler, Post, Body } from "next-api-decorators"
import { getAddress, parseEther } from "ethers/lib/utils.js"
import createMerkleProof from "../../../../../lib/merkle/createMerkleProof"
import { addMerkleList } from "../../../../../helpers/merkleList.db"
import { AdminAuthGuard } from "../../../../../middleware/auth.middleware"

class CreateMerkle {
  @AdminAuthGuard()
  @Post()
  async createMerkle(@Body() body: { addresses: string[] }) {
    const { addresses } = body
    const whitelistedUsers = addresses.map((address) => ({
      minter: getAddress(address),
      maxCount: 8,
      price: parseEther("0.15"),
    }))
    const result = createMerkleProof(whitelistedUsers)
    const documents: {
      root: string
      entries?: Array<{ minter: string; proof: [] }>
      timestamp?: Date
    } = { root: result.root }
    const entries = []
    result.entries.forEach((entry) => {
      entries.push({
        minter: entry.minter,
        proof: entry.proof,
      })
    })
    documents.entries = entries
    documents.timestamp = new Date()
    const res = await addMerkleList(documents)
    return res
  }
}

export default createHandler(CreateMerkle)
