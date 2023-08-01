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
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { getPassportIds, getAvailableFreeMints } from "../lib/collectionHolder"
import { getLockedCount } from "../lib/cre8or"
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { toast } from "react-toastify"

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
  checkNetwork: () => boolean
  refetchInformation: () => Promise<void>
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

  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const [initialData, setInitialData] = useState<{
    passports: Array<number | string>
    discount: boolean
    quantityLeft: number
  } | null>(null)

  const getLockedAndQuantityInformation = useCallback(async () => {
    if (!address) return
    const lockedCnt = await getLockedCount(address)
    setLockedCntOfCre8or(lockedCnt)
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

  const checkNetwork = () => {
    if (activeChain?.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)) {
      switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10))
      const allChains = [mainnet, goerli, polygon, polygonMumbai]
      const myChain = allChains.find(
        (blockchain) => blockchain.id === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10),
      )
      toast.error(`Please connect to ${myChain.name} and try again`)

      return false
    }

    return true
  }

  const refetchInformation = async () => {
    await getInitialData()
    await getLockedAndQuantityInformation()
  }

  useEffect(() => {
    if (!address) return
    getInitialData()
  }, [address, getInitialData])

  useEffect(() => {
    if (!initialData) return
    setFreeMintClaimedCount(initialData?.passports?.length)
    setHasNotFreeMintClaimed(initialData?.passports?.length > 0)
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
      checkNetwork,
      refetchInformation,
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
      checkNetwork,
      refetchInformation,
    ],
  )

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
