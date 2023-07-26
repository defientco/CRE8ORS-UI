import { useCallback, useEffect, useMemo, useState } from "react"
import { freeMintClaimed, getLastPassportId, mintByCollectionHolder } from "../../lib/collectionHolder"
import { hasDiscount, mintByFriendsAndFamily } from "../../lib/friendAndFamily"
import { Signer } from "ethers"
import purchase from "../../lib/purchase"
import cre8orAbi from '../../lib/abi-cre8ors.json'

interface Props {
    address: string
    signer: Signer
    getCre8orInformation: () => Promise<void>
    setConfettiEffect: () => void
    setLoading: (loading: boolean) => void
}

const usePassportMintDay = ({
    address,
    signer,
    getCre8orInformation,
    setConfettiEffect,
    setLoading
}: Props) => {
    const [hasFriendAndFamily, setHasFriendAndFamily] = useState(null)
    const [passportId, setPassportId] = useState(null)
    const [passportCount, setPassportCount] = useState(0)
    const [isClaimedFree, setIsClaimedFree] = useState(null)

    const hasPassport = useMemo(
        () => address && passportId !== null && passportCount !== 0 && isClaimedFree === false,
        [passportId, address, passportCount],
    )

    const getClaimedFree = useCallback(async () => {
      if (passportId === null) return
  
      const isClaimed = await freeMintClaimed(passportId)
      setIsClaimedFree(isClaimed)
    }, [passportId])
    
    const getFriendsAndFamilyInformation = useCallback(async () => {
      if (!address) return
      const detectedDiscount = await hasDiscount(address)
      setHasFriendAndFamily(detectedDiscount)
    }, [address])
  
    const getPassportInformation = useCallback(async () => {
      if (!address) return
      const { id: lastPassportId, noOfPassports } = await getLastPassportId(address)
      setPassportId(lastPassportId?.id?.tokenId || null)
      setPassportCount(noOfPassports)
    }, [address])
    
    const freeMintFamilyAndFriend = async () => {
      if(!signer) return
      setLoading(true)
      const receipt = await mintByFriendsAndFamily(signer)
      if (!receipt.error) {
        await getFriendsAndFamilyInformation()
        await getCre8orInformation()
        setConfettiEffect()
      }
      setLoading(false)
    }
    
    const freeMintPassportHolder = async () => {
      if(!signer) return
      if (!isClaimedFree) {
        setLoading(true)
        const receipt = await mintByCollectionHolder(signer, passportId)
        if (!receipt.error) {
          await getPassportInformation()
          await getCre8orInformation()
          setConfettiEffect()
        }
        setLoading(false)
      }
    }

    const mintCre8ors = async () => {
      if(!signer) return
      setLoading(true)
      const receipt = await purchase(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, signer, cre8orAbi)
      setLoading(false)
      if(!receipt.error) {
        await getCre8orInformation()
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
      hasPassport,
      hasFriendAndFamily,
      freeMintPassportHolder,
      freeMintFamilyAndFriend,
      mintCre8ors
    }
}

export default usePassportMintDay