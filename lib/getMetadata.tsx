import getDeterministicRandom from "./getDeterministicRandom"
import feminine from "../public/metadata/raw/feminine.json"
import masculineAndSpecial from "../public/metadata/raw/masculine_and_special.json"
import formatMetadata from "./formatMetadata"

const MAX_TOKEN_ID = 8888
const HALF_MAX = MAX_TOKEN_ID / 2

const getMetadata = (tokenId) => {
  if (tokenId <= 0 || tokenId > MAX_TOKEN_ID) return {}
  const metadataId = getDeterministicRandom(tokenId)
  if (metadataId <= HALF_MAX) {
    return formatMetadata(feminine.data[tokenId], tokenId)
  }
  const index = metadataId - 4444
  return formatMetadata(masculineAndSpecial.data[index], tokenId)
}

export default getMetadata
