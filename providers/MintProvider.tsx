import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react"
import { useAccount } from "wagmi"
import { hasDiscount } from "../lib/friendAndFamily"
import { freeMintClaimed, getPassportIds } from "../lib/collectionHolder"
import { getLockedCount } from "../lib/cre8or"
import { getQuantityLeft } from "../lib/minterUtility"

interface mintProps {
  lockedCntOfCre8or: number | null
  leftQuantityCount: number | null
  passportIds: any
  hasFriendAndFamily: boolean | null
  hasPassport: boolean | null
  hasNotFreeMintClaimed: boolean | null
  freeMintCount: number | null
  getFFAndPassportsInformation: () => Promise<void>
  getLockedAndQuantityInformation: () => Promise<void>
}

interface Props {
  children: ReactNode
}

const MintContext = createContext<Partial<mintProps> | null>(null)

export const MintProvider: FC<Props> = ({ children }) => {
  const { address } = useAccount()

  const [hasFriendAndFamily, setHasFriendAndFamily] = useState<boolean | null>(null)
  const [hasPassport, setHasPassport] = useState<boolean | null>(null)
  const [hasNotFreeMintClaimed, setHasNotFreeMintClaimed] = useState<boolean | null>(null)
  const [passportIds, setPassportIds] = useState(null)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState<number | null>(null)
  const [leftQuantityCount, setLeftQuantityCount] = useState<number | null>(null)
  const [freeMintClaimedCount, setFreeMintClaimedCount] = useState<number | null>(null)

  const getClaimedFree = async (passportsArray: any) => {
    if (!passportsArray) return

    if (!passportsArray?.length) {
      setHasPassport(false)
      setHasNotFreeMintClaimed(false)
      return
    }

    setHasPassport(true)

    let detectedFreeMintClaimed = false
    const canFreeClaimedMintPassportIds = []
    for (let i = 0; i < passportsArray?.length; i++) {
      const isClaimed = await freeMintClaimed(passportsArray[i]?.id?.tokenId)
      if (!isClaimed) {
        if (!detectedFreeMintClaimed) {
          detectedFreeMintClaimed = true
          setHasNotFreeMintClaimed(!isClaimed)
        }

        canFreeClaimedMintPassportIds.push(parseInt(passportsArray[i]?.id?.tokenId, 16))
      }
    }
    if (!detectedFreeMintClaimed) {
      setHasNotFreeMintClaimed(false)
    }
    setFreeMintClaimedCount(canFreeClaimedMintPassportIds.length)
    setPassportIds(canFreeClaimedMintPassportIds)
  }

  const getFFAndPassportsInformation = useCallback(async () => {
    if (!address) return
    const detectedDiscount = await hasDiscount(address)
    const allPassportIds = await getPassportIds(address)
    await getClaimedFree(allPassportIds)

    setHasFriendAndFamily(detectedDiscount)
  }, [address])

  const getLockedAndQuantityInformation = useCallback(async () => {
    if (!address) return
    const lockedCnt = await getLockedCount(address)
    const response = await getQuantityLeft(address)
    setLockedCntOfCre8or(lockedCnt)
    if (!response.error) setLeftQuantityCount(parseInt(response, 10))
  }, [address])

  const freeMintCount = useMemo(() => {
    if (hasFriendAndFamily === null || hasPassport === null || hasNotFreeMintClaimed === null)
      return null
    return (hasFriendAndFamily ? 1 : 0) + (freeMintClaimedCount || 0)
  }, [freeMintClaimedCount, hasFriendAndFamily])

  useEffect(() => {
    getFFAndPassportsInformation()
  }, [getFFAndPassportsInformation])

  useEffect(() => {
    getLockedAndQuantityInformation()
  }, [getLockedAndQuantityInformation])

  const provider = {
    freeMintCount,
    lockedCntOfCre8or,
    leftQuantityCount,
    passportIds,
    hasPassport,
    hasNotFreeMintClaimed,
    hasFriendAndFamily,
    getFFAndPassportsInformation,
    getLockedAndQuantityInformation,
  }

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
