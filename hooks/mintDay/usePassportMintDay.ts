import { Signer } from "ethers"
import { mintByCollectionHolder } from "../../lib/collectionHolder"
import { mintByFriendsAndFamily } from "../../lib/friendAndFamily"
import purchase from "../../lib/purchase"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useMintProvider } from "../../providers/MintProvider"

interface Props {
  signer: Signer
}

const usePassportMintDay = ({ signer }: Props) => {
  const { passportIds } = useMintProvider()

  const freeMintFamilyAndFriend = async () => {
    if (!signer) return

    let response = await mintByFriendsAndFamily(signer)
    return response
  }

  const freeMintPassportHolder = async () => {
    if (!signer) return

    let response = await mintByCollectionHolder(signer, passportIds)
    return response
  }

  const mintCre8ors = async () => {
    if (!signer) return

    await purchase(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, signer, cre8orAbi)
  }

  return {
    freeMintPassportHolder,
    freeMintFamilyAndFriend,
    mintCre8ors,
  }
}

export default usePassportMintDay
