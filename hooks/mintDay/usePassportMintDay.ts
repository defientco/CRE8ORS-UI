import { useCallback, useEffect, useState } from "react"
import { freeMintClaimed, getPassportIds, mintByCollectionHolder } from "../../lib/collectionHolder"
import { hasDiscount, mintByFriendsAndFamily } from "../../lib/friendAndFamily"
import { Signer } from "ethers"
import purchase from "../../lib/purchase"
import cre8orAbi from '../../lib/abi-cre8ors.json'

interface Props {
    address: string
    signer: Signer
    getLockedAndQuantityInformation: () => Promise<void>
    setConfettiEffect: () => void
    handleLoading: (loading: boolean) => void
}

const usePassportMintDay = ({
    address,
    signer,
    getLockedAndQuantityInformation,
    setConfettiEffect,
    handleLoading
}: Props) => {
    const [hasFriendAndFamily, setHasFriendAndFamily] = useState(null)
    const [hasPassport, setHasPassport] = useState(null)
    const [hasNotFreeMintClaimed, setHasNotFreeMintClaimed] = useState(null)
    const [canFreeMintPassportId, setCanFreeMintPassportId] = useState(null)

    const getClaimedFree = async (passportsArray: any) => {
      if (!passportsArray) return

      if (!passportsArray?.length) {
        setHasPassport(false)
        setHasNotFreeMintClaimed(false)
        return
      }

      setHasPassport(true)
      let detectedNotFreeMintedPassport = false

      for(let i = 0 ; i < passportsArray?.length ; i++) {
        const isClaimed = await freeMintClaimed(passportsArray[i]?.id?.tokenId)
        if(!isClaimed && !detectedNotFreeMintedPassport) {
          detectedNotFreeMintedPassport = true
          setHasNotFreeMintClaimed(!isClaimed)
          setCanFreeMintPassportId(passportsArray[i]?.id?.tokenId)
        }
      }
    }
    
    const getFFAndPassportsInformation = useCallback(async () => {
      if (!address) return
      const detectedDiscount = await hasDiscount(address)
      setHasFriendAndFamily(detectedDiscount)

      const allPassportIds = await getPassportIds(address)
      await getClaimedFree(allPassportIds)
    }, [address])
  
    const freeMintFamilyAndFriend = async () => {
      if(!signer) return
      handleLoading(true)
      const receipt = await mintByFriendsAndFamily(signer)
      handleLoading(false)
      if (!receipt.error) {
        await getFFAndPassportsInformation()
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }
    
    const freeMintPassportHolder = async () => {
      if(!signer) return
      handleLoading(true)
      const receipt = await mintByCollectionHolder(signer, canFreeMintPassportId)
      handleLoading(false)
      if (!receipt.error) {
        await getFFAndPassportsInformation()
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }

    const mintCre8ors = async () => {
      if(!signer) return
      handleLoading(true)
      const receipt = await purchase(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, signer, cre8orAbi)
      handleLoading(false)
      if(!receipt.error) {
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }
  
    useEffect(() => {
      getFFAndPassportsInformation()
    }, [getFFAndPassportsInformation])

    return {
      hasPassport,
      hasNotFreeMintClaimed,
      hasFriendAndFamily,
      freeMintPassportHolder,
      freeMintFamilyAndFriend,
      mintCre8ors
    }
}

export default usePassportMintDay