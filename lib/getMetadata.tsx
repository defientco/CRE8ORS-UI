import getDeterministicRandom from "./getDeterministicRandom"
import feminine from "../public/metadata/raw/feminine.json"
import masculineAndSpecial from "../public/metadata/raw/masculine_and_special.json"

const format = (raw, tokenId) => ({
  ...raw,
  name: `Cre8ors #${tokenId}`,
  description: "A cult for creators.",
})

const getMetadata = (tokenId) => {
  // 1. get metadataID from tokenId
  const metadataId = getDeterministicRandom(tokenId)
  console.log(`SWEETS TokenId ${tokenId} maps to ${metadataId}`)
  // 2. get metadata
  if (tokenId <= 0) return {}
  if (tokenId <= 4444) {
    return format(feminine.data[tokenId], tokenId)
  }
  if (tokenId <= 8888) {
    const index = tokenId - 4444
    return format(masculineAndSpecial.data[index], tokenId)
  }
  // 3. verify results
}

export default getMetadata
