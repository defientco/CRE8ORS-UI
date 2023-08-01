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
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { toast } from "react-toastify"
import { getPassportIds, getAvailableFreeMints } from "../lib/collectionHolder"
import { getLockedCount } from "../lib/cre8or"
import useMintCart from "../hooks/useMintCart"

interface mintProps {
  lockedCntOfCre8or: number | null
  leftQuantityCount: number | null
  passportIds: any
  hasFriendAndFamily: boolean | null
  hasPassport: boolean | null
  hasUnclaimedFreeMint: boolean | null
  freeMintCount: number | null
  cart: any[]
  getFFAndPassportsInformation: () => Promise<void>
  getLockedAndQuantityInformation: () => Promise<void>
  checkNetwork: () => boolean
  refetchInformation: () => Promise<void>
  addToCart: (tier: number) => void
  removeFromCart: (tier: number) => void
  getCartTier: (tier: number) => number
}

interface Props {
  children: ReactNode
}

const MintContext = createContext<Partial<mintProps> | null>(null)

export const MintProvider: FC<Props> = ({ children }) => {
  const { address } = useAccount()

  const [hasFriendAndFamily, setHasFriendAndFamily] = useState<boolean | null>(null)
  const [hasPassport, setHasPassport] = useState<boolean | null>(null)
  const [hasUnclaimedFreeMint, setHasUnclaimedFreeMint] = useState<boolean | null>(null)
  const [passportIds, setPassportIds] = useState(null)
  const [lockedCntOfCre8or, setLockedCntOfCre8or] = useState<number | null>(null)
  const [leftQuantityCount, setLeftQuantityCount] = useState<number | null>(null)
  const [freeMintClaimedCount, setFreeMintClaimedCount] = useState<number | null>(null)
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { cart, addToCart, removeFromCart, getCartTier } = useMintCart()

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
    if (hasFriendAndFamily === null || hasPassport === null || hasUnclaimedFreeMint === null)
      return null
    return (hasFriendAndFamily ? 1 : 0) + (freeMintClaimedCount || 0)
  }, [freeMintClaimedCount, hasFriendAndFamily, hasUnclaimedFreeMint, hasPassport])

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
    setHasUnclaimedFreeMint(initialData?.passports?.length > 0)
    setHasFriendAndFamily(initialData?.discount)
    setLeftQuantityCount(initialData?.quantityLeft)
  }, [initialData])

  useEffect(() => {
    getLockedAndQuantityInformation()
  }, [getLockedAndQuantityInformation])

  const provider = useMemo(
    () => ({
      cart,
      freeMintCount,
      lockedCntOfCre8or,
      leftQuantityCount,
      passportIds,
      hasPassport,
      hasUnclaimedFreeMint,
      hasFriendAndFamily,
      getLockedAndQuantityInformation,
      checkNetwork,
      refetchInformation,
      addToCart,
      removeFromCart,
      getCartTier,
    }),
    [
      cart,
      freeMintCount,
      lockedCntOfCre8or,
      leftQuantityCount,
      passportIds,
      hasPassport,
      hasUnclaimedFreeMint,
      hasFriendAndFamily,
      getLockedAndQuantityInformation,
      checkNetwork,
      refetchInformation,
      addToCart,
      removeFromCart,
      getCartTier,
    ],
  )

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
