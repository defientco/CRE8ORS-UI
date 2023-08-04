import getNFTs from "./alchemy/getNFTs"

const getProfileFormattedCollection = async (address) => {
  const response = await getNFTs(address, null, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)

  // Transformation of the raw data
  const formattedData = response.ownedNfts.map((nft) => ({
    label: nft.contractMetadata.name, // You can change this according to your specific requirements
    type: nft.contract.address === process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS ? "cre8or" : undefined,
    isLocked: true,
    image: nft.media[0].thumbnail,
    // Add additional properties if needed
  }))

  return formattedData
}

export default getProfileFormattedCollection
