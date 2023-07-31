import { Signer } from "ethers"
import { mintByCollectionHolder } from "../../lib/collectionHolder"
import { mintByFriendsAndFamily } from "../../lib/friendAndFamily"
import purchase from "../../lib/purchase"
import publicMintAbi from "../../lib/abi-public-minter.json"
import { useMintProvider } from "../../providers/MintProvider"

interface Props {
  signer: Signer
}

const usePassportMintDay = ({ signer }: Props) => {
  const { passportIds, cart } = useMintProvider()

  const freeMintFamilyAndFriend = async () => {
    if (!signer) return

    const response = await mintByFriendsAndFamily(signer)
    return response
  }

  const freeMintPassportHolder = async () => {
    if (!signer) return

    const response = await mintByCollectionHolder(signer, passportIds)
    return response
  }

  const mintCre8ors = async () => {
    if (!signer) return
    const params = {
      recipient: await signer.getAddress(),
      cart,
      passportHolderMinterAddress: process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
      familyAndFriendsMinterAddress: process.env.NEXT_PUBLIC_FRIENDS_AND_FAMILY_ADDRESS,
    }
    await purchase(
      process.env.NEXT_PUBLIC_GENERAL_PUBLIC_MINTER_ADDRESS,
      signer,
      publicMintAbi,
      params,
    )
  }

  return {
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
    mintCre8ors,
  }
}

export default usePassportMintDay
