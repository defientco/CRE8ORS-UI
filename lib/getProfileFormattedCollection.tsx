import getNFTs from "./alchemy/getNFTs"
import getFormattedCollection from "./getFormattedCollection"

export const SPECIALNFTS = "special"
export const ALLNFTS = "all"

const getProfileFormattedCollection = async (address, type) => {
  const collection = []

  if (type === SPECIALNFTS) {
    const [cre8ors, passport, dnas] = await Promise.all([
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
      getNFTs(
        address,
        process.env.NEXT_PUBLIC_DNA_ADDRESS,
        process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
      ),
    ])
    collection.push(...cre8ors.ownedNfts, ...passport.ownedNfts, ...dnas.ownedNfts)
  }
  if (type === ALLNFTS) {
    const response = await getNFTs(address, null, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
    collection.push(...response.ownedNfts)
  }

  const formattedData = getFormattedCollection(collection)

  return formattedData
}

export default getProfileFormattedCollection
