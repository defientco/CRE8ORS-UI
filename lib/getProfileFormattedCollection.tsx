import getNFTs from "./alchemy/getNFTs"

const getProfileFormattedCollection = async (address) => {
  const cre8orCollections: any = await Promise.all(
    [process.env.NEXT_PUBLIC_CLAIM_PASSPORT_ADDRESS, process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS].map(
      async (contractAddress) => {
        const response = await getNFTs(
          address,
          contractAddress,
          process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
        )
        return response.ownedNfts
      },
    ),
  )

  const formattedData = cre8orCollections.flat().map((nft) => ({
    label: nft.contractMetadata.name,
    type: nft.contract.address === process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS ? "cre8or" : undefined,
    isLocked: true,
    image: nft.media[0].thumbnail,
    tokenId: parseInt(nft.id.tokenId, 16),
  }))

  return formattedData
}

export default getProfileFormattedCollection
