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
import { getAvailableFreeMints, getPassportIds } from "../lib/collectionHolder"
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
  const [initialData, setInitialData] = useState<{
    passports: Array<number | string>
    discount: boolean
    quantityLeft: number
  } | null>(null)

  const getLockedAndQuantityInformation = useCallback(async () => {
    if (!address) return
    const lockedCnt = await getLockedCount(address)
    const response = await getQuantityLeft(address)
    setLockedCntOfCre8or(lockedCnt)
    if (!response.error) setLeftQuantityCount(parseInt(response, 10))
  }, [address])

  const getInitialData = useCallback(async () => {
    const passportsArray = await getPassportIds(address)
    setHasPassport(passportsArray?.length > 0)
    const tokenIds = passportsArray?.map((passport: any) => passport?.id?.tokenId)
    if (tokenIds?.length > 0) setPassportIds(tokenIds)
    const results = await getAvailableFreeMints(tokenIds, address)
    setInitialData(results)
  }, [address])

  const freeMintCount = useMemo(() => {
    if (hasFriendAndFamily === null || hasPassport === null || hasNotFreeMintClaimed === null)
      return null
    return (hasFriendAndFamily ? 1 : 0) + (freeMintClaimedCount || 0)
  }, [freeMintClaimedCount, hasFriendAndFamily, hasNotFreeMintClaimed, hasPassport])

  useEffect(() => {
    if (!address) return
    getInitialData()
  }, [address, getInitialData])

  useEffect(() => {
    if (!initialData) return
    setFreeMintClaimedCount(initialData?.passports?.length)
    setHasNotFreeMintClaimed(initialData?.passports?.length > 0 || initialData?.discount)
    setHasFriendAndFamily(initialData?.discount)
    setLeftQuantityCount(initialData?.quantityLeft)
  }, [initialData])

  useEffect(() => {
    getLockedAndQuantityInformation()
  }, [getLockedAndQuantityInformation])

  const provider = useMemo(
    () => ({
      freeMintCount,
      lockedCntOfCre8or,
      leftQuantityCount,
      passportIds,
      hasPassport,
      hasNotFreeMintClaimed,
      hasFriendAndFamily,
      getLockedAndQuantityInformation,
    }),
    [
      freeMintCount,
      lockedCntOfCre8or,
      leftQuantityCount,
      passportIds,
      hasPassport,
      hasNotFreeMintClaimed,
      hasFriendAndFamily,
      getLockedAndQuantityInformation,
    ],
  )

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
