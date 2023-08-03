import { useAccount, useSigner } from "wagmi"
import { mintByCollectionHolder } from "../../lib/collectionHolder"
import { mintByFriendsAndFamily } from "../../lib/friendAndFamily"
import purchase from "../../lib/purchase"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useMintProvider } from "../../providers/MintProvider"

const usePassportMintDay = () => {
  const { availablePassportIds } = useMintProvider()
  const { data: signer } = useSigner()
  const { address } = useAccount()

  const freeMintFamilyAndFriend = async () => {
    if (!signer) return null

    const response = await mintByFriendsAndFamily(signer)
    return response
  }

  const freeMintPassportHolder = async () => {
    if (!signer) return null

    const response = await mintByCollectionHolder(signer, availablePassportIds, address)
    return response
  }

  const mintCre8ors = async () => {
    if (!signer) return null

    const response = await purchase(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, signer, cre8orAbi)
    return response
  }

  return {
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
    mintCre8ors,
  }
}

export default usePassportMintDay
