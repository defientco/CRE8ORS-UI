import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react"
import getProfileFormattedCollection, {
  ALLNFTS,
  SPECIALNFTS,
} from "../lib/getProfileFormattedCollection"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"

interface Props {
  children: ReactNode
}

const WalletCollectionContext = createContext<Partial<any> | null>(null)

export const WallectCollectionProvider: FC<Props> = ({ children }) => {
  const router = useRouter()

  const [selectedTrainTokenData, setSelectedTrainTokenData] = useState<any>(null)

  const [isViewAll, setIsViewAll] = useState(null)
  const [walletNfts, setWalletNfts] = useState(null)
  const [cre8ors, setCre8ors] = useState(null)
  const [ownedNfts, setOwnedNfts] = useState([])
  const { address } = useAccount()
  const routerAddress = router.query.address as string

  const toggleProfileFormattedCollection = useCallback(async () => {
    if (isViewAll) {
      if (walletNfts === null) {
        const response = await getProfileFormattedCollection(routerAddress || address, ALLNFTS)
        setWalletNfts(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...walletNfts])
    } else {
      if (cre8ors === null) {
        const response = await getProfileFormattedCollection(routerAddress || address, SPECIALNFTS)
        setCre8ors(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...cre8ors])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewAll, address])

  const refetchProfileFormattedCollection = async () => {
    const walletResponse = await getProfileFormattedCollection(routerAddress || address, ALLNFTS)
    setWalletNfts(walletResponse)
    const cre8orResponse = await getProfileFormattedCollection(
      routerAddress || address,
      SPECIALNFTS,
    )
    setCre8ors(cre8orResponse)
    setOwnedNfts(isViewAll ? walletResponse : cre8orResponse)
  }

  useEffect(() => {
    toggleProfileFormattedCollection()
  }, [toggleProfileFormattedCollection])

  const provider = useMemo(
    () => ({
      ownedNfts,
      isViewAll,
      setIsViewAll,
      setWalletNfts,
      setCre8ors,
      setOwnedNfts,
      setSelectedTrainTokenData,
      selectedTrainTokenData,
      toggleProfileFormattedCollection,
      refetchProfileFormattedCollection,
    }),
    [
      ownedNfts,
      isViewAll,
      setIsViewAll,
      setWalletNfts,
      setCre8ors,
      setOwnedNfts,
      setSelectedTrainTokenData,
      selectedTrainTokenData,
      toggleProfileFormattedCollection,
      refetchProfileFormattedCollection,
    ],
  )

  return (
    <WalletCollectionContext.Provider value={provider}>{children}</WalletCollectionContext.Provider>
  )
}

export const useWalletCollectionProvider = () => useContext(WalletCollectionContext)
