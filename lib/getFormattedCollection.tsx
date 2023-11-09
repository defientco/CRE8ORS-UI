import { CRE8OR } from "../components/ProfilePage/types"
import { isMatchAddress } from "./isMatchAddress"

const getFormattedCollection = (collection) => {
  const formattedData = collection.map((nft) => ({
    label: nft.metadata.name,
    type: isMatchAddress(nft.contract.address, process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS)
      ? CRE8OR
      : undefined,
    image: nft.media[0].gateway,
    tokenId: parseInt(nft.id.tokenId, 16),
    contractAddress: nft.contract.address,
  }))
  return formattedData
}

export default getFormattedCollection
