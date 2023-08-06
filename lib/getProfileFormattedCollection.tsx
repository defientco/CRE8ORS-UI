import getNFTs from "./alchemy/getNFTs"

const getProfileFormattedCollection = async (address) => {
  const [cre8ors, passport] = await Promise.all([
    getNFTs(address,process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    getNFTs(address,process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  ])
  const collection = [...cre8ors.ownedNfts, ...passport.ownedNfts]

  const formattedData = collection.map((nft) => ({
    label: nft.contractMetadata.name,
    type: nft.contract.address === process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS ? "cre8or" : undefined,
    isLocked: true,
    image: nft.media[0].thumbnail,
    tokenId: parseInt(nft.id.tokenId, 16),
  }))

  return formattedData
}

export default getProfileFormattedCollection
