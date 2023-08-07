import { CRE8OR } from "../components/ProfilePage/types"
import getNFTs from "./alchemy/getNFTs"

const getProfileFormattedCollection = async (address, type) => {
  const collection = []

  if (type === 1) {
    const [cre8ors, passport] = await Promise.all([
      getNFTs(
        address,
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
      ),
      getNFTs(
        address,
        process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS,
        process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
      ),
    ])
    collection.push(...cre8ors.ownedNfts, ...passport.ownedNfts)
  } else {
    const response = await getNFTs(address, null, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
    collection.push(...response.ownedNfts)
  }

  const formattedData = collection.map((nft) => ({
    label: nft.contractMetadata.name,
    type:
      nft.contract.address.toLowerCase() === process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS.toLowerCase()
        ? CRE8OR
        : undefined,
    isLocked: true,
    image: nft.media[0].thumbnail,
    tokenId: parseInt(nft.id.tokenId, 16),
  }))

  return formattedData
}

export default getProfileFormattedCollection
