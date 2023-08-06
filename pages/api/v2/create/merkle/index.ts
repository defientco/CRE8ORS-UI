import { createHandler, Post, Body } from "next-api-decorators"
import { getAddress, parseEther } from "ethers/lib/utils.js"
import createMerkleProof from "../../../../../lib/merkle/createMerkleProof"

class CreateMerkle {
  @Post()
  async createMerkle(@Body() body: { addresses: string[] }) {
    console.log("body", body)
    const { addresses } = body
    const whitelistedUsers = addresses.map((address) => ({
      minter: getAddress(address),
      maxCount: 8,
      price: parseEther("0.15"),
    }))
    console.log("addresses", addresses)
    const result = createMerkleProof(whitelistedUsers)
    return result
  }
}

export default createHandler(CreateMerkle)
