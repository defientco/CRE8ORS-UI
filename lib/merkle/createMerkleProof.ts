import MerkleTree from "merkletreejs"
import keccak256 from "keccak256"
import { hexValue } from "ethers/lib/utils.js"
import { BigNumber } from "ethers"
import hashMerkleEntry from "./hashMerkleEntry"

const createMerkleProof = (
  whitelistedUsers: Array<{ minter: string; maxCount: number; price: BigNumber }>,
) => {
  let entries = whitelistedUsers.map((entry) => {
    const newEntry = entry as any
    newEntry.hash = hashMerkleEntry(entry)
    return newEntry
  })
  const newtree = new MerkleTree(
    entries.map((entry) => entry.hash),
    keccak256,
    { sortPairs: true },
  )
  entries = entries.map((entry) => {
    const newEntry = entry as any
    newEntry.hash = hexValue(entry.hash)
    newEntry.proof = newtree.getHexProof(entry.hash)
    return newEntry
  })
  return {
    tree: newtree,
    entries,
    root: newtree.getHexRoot(),
  }
}

export default createMerkleProof
