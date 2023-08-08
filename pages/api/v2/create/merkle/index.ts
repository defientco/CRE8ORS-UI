import { createHandler, Post, Body } from "next-api-decorators"
import { getAddress, parseEther, isAddress } from "ethers/lib/utils.js"
import createMerkleProof from "../../../../../lib/merkle/createMerkleProof"
import { addMerkleList } from "../../../../../helpers/merkleList.db"
import { AdminAuthGuard } from "../../../../../middleware/auth.middleware"
import { getAcceptedAllowlistApplicants } from "../../../../../helpers/db"

class CreateMerkle {
  @AdminAuthGuard()
  @Post()
  async createMerkle(@Body() body: { addresses?: string[]; getFromDB?: boolean }) {
    const { addresses, getFromDB } = body
    const addressesToWhitelist = []
    if (getFromDB) {
      const result = await getAcceptedAllowlistApplicants()
      const resultAddresses = result.result.map((item) => item?.walletAddress.toLowerCase())
      const filterAddresses = resultAddresses.filter((item) => isAddress(item))
      addressesToWhitelist.push(...filterAddresses)
    } else if (addresses.length > 0) {
      addressesToWhitelist.push(...addresses)
    }

    const whitelistedUsers = addressesToWhitelist.map((address) => ({
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
