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
import { hasDiscount, maxClaimedFree } from "../lib/friendAndFamily"
import { freeMintClaimed, getPassportIds } from "../lib/collectionHolder"
import { getLockedCount } from "../lib/cre8or"
import { getQuantityLeft } from "../lib/minterUtility"

interface mintProps {
  lockedCntOfCre8or: number | null
  leftQuantityCount: number | null
  passportIds: any
  cart: any
  hasFriendAndFamily: boolean | null
  hasPassport: boolean | null
  hasNotFreeMintClaimed: boolean | null
  freeMintCount: number | null
  getFFAndPassportsInformation: () => Promise<void>
  getLockedAndQuantityInformation: () => Promise<void>
  checkNetwork: () => boolean
  refetchInformation: () => Promise<void>
  setCart: (cart: []) => void
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
  const [cart, setCart] = useState([])
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

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
    const maxClaimedFreeCnt = await maxClaimedFree(address)
    const allPassportIds = await getPassportIds(address)
    await getClaimedFree(allPassportIds)

    setHasFriendAndFamily(detectedDiscount || maxClaimedFreeCnt > 0)
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
    await getFFAndPassportsInformation()
    await getLockedAndQuantityInformation()
  }

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
    checkNetwork,
    refetchInformation,
    cart,
    setCart,
  }

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
