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
    setLoading: (loading: boolean) => void
}

const usePassportMintDay = ({
    address,
    signer,
    getLockedAndQuantityInformation,
    setConfettiEffect,
    setLoading
}: Props) => {
    const [hasFriendAndFamily, setHasFriendAndFamily] = useState(null)
    const [hasPassportAndNotFreeMinted, setHasPassportAndNotFreeMinted] = useState(null)
    const [passportIds, setPassportIds] = useState(null)
    const [canFreeMintPassportId, setCanFreeMintPassportId] = useState(null)

    const getClaimedFree = useCallback(async () => {
      if (!passportIds) return
  
      let detectedNotFreeMintedPassport = false

      for(let i = 0 ; i < passportIds?.length ; i++) {
        const isClaimed = await freeMintClaimed(passportIds[i]?.id?.tokenId)
        if(!isClaimed && !detectedNotFreeMintedPassport) {
          detectedNotFreeMintedPassport = true
          setHasPassportAndNotFreeMinted(!isClaimed)
          setCanFreeMintPassportId(passportIds[i]?.id?.tokenId)
        }
      }
    }, [passportIds])
    
    const getFriendsAndFamilyInformation = useCallback(async () => {
      if (!address) return
      const detectedDiscount = await hasDiscount(address)
      setHasFriendAndFamily(detectedDiscount)
    }, [address])
  
    const getPassportInformation = useCallback(async () => {
      if (!address) return
      const allPassportIds = await getPassportIds(address)

      setPassportIds(allPassportIds || null)
    }, [address])
    
    const freeMintFamilyAndFriend = async () => {
      if(!signer) return
      setLoading(true)
      const receipt = await mintByFriendsAndFamily(signer)
      setLoading(false)
      if (!receipt.error) {
        await getFriendsAndFamilyInformation()
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }
    
    const freeMintPassportHolder = async () => {
      if(!signer) return
      setLoading(true)
      const receipt = await mintByCollectionHolder(signer, canFreeMintPassportId)
      setLoading(false)
      if (!receipt.error) {
        await getPassportInformation()
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }

    const mintCre8ors = async () => {
      if(!signer) return
      setLoading(true)
      const receipt = await purchase(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, signer, cre8orAbi)
      setLoading(false)
      if(!receipt.error) {
        await getLockedAndQuantityInformation()
        setConfettiEffect()
      }
    }
  
    useEffect(() => {
      getClaimedFree()
    }, [getClaimedFree])
  
    useEffect(() => {
      getPassportInformation()
    }, [getPassportInformation])
  
    useEffect(() => {
      getFriendsAndFamilyInformation()
    }, [getFriendsAndFamilyInformation])

    return {
      hasPassportAndNotFreeMinted,
      hasFriendAndFamily,
      freeMintPassportHolder,
      freeMintFamilyAndFriend,
      mintCre8ors
    }
}

export default usePassportMintDay