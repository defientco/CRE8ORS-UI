import { defaultAbiCoder, getAddress } from "ethers/lib/utils.js"
import keccak256 from "keccak256"

const hashMerkleEntry = (entry) => {
  const { minter, maxMint, mintPrice } = entry
  return keccak256(
    defaultAbiCoder.encode(
      ["address", "uint256", "uint256"],
      [getAddress(minter), maxMint, mintPrice],
    ),
  )
}

export default hashMerkleEntry
