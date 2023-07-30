import MerkleTree from "merkletreejs"
import keccak256 from "keccak256"
import { hexValue } from "ethers/lib/utils.js"
import hashMerkleEntry from "./hashMerkleEntry"

const generateMerkleProof = (userEntry, whitelistedUsers) => {
  const { minter } = userEntry

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
  let whitelistedUser
  const entryList = [...entries]
  for (let i = 0; i < entryList.length; i += 1) {
    if (entryList[i].minter === minter) {
      console.log("found user")
      whitelistedUser = entryList[i]
    }
  }

  return whitelistedUser.proof
}

export default generateMerkleProof
