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
import getProfileFormattedCollection from "../lib/getProfileFormattedCollection"
import { useRouter } from "next/router"

interface Props {
  children: ReactNode
}

const WalletCollectionContext = createContext<Partial<any> | null>(null)

export const WallectCollectionProvider: FC<Props> = ({ children }) => {
  const router = useRouter()

  const [selectedTokenIdForUnlock, setSelectedTokenIdForUnlock] = useState(null)
  const [selectedTokenIdForTrain, setSelectedTokenIdForTrain] = useState(null)
  const [isViewAll, setIsViewAll] = useState(null)
  const [walletNfts, setWalletNfts] = useState(null)
  const [cre8ors, setCre8ors] = useState(null)
  const [ownedNfts, setOwnedNfts] = useState([])
  const { address } = router.query as any

  const toggleProfileFormattedCollection = useCallback(async () => {
    if (isViewAll) {
      if (walletNfts === null) {
        const response = await getProfileFormattedCollection(address, 2)
        setWalletNfts(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...walletNfts])
    } else {
      if (cre8ors === null) {
        const response = await getProfileFormattedCollection(address, 1)
        setCre8ors(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...cre8ors])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewAll])

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
      setSelectedTokenIdForTrain,
      setSelectedTokenIdForUnlock,
      selectedTokenIdForUnlock,
      selectedTokenIdForTrain,
      toggleProfileFormattedCollection,
    }),
    [
      ownedNfts,
      isViewAll,
      setIsViewAll,
      setWalletNfts,
      setCre8ors,
      setOwnedNfts,
      setSelectedTokenIdForTrain,
      setSelectedTokenIdForUnlock,
      selectedTokenIdForTrain,
      selectedTokenIdForUnlock,
      toggleProfileFormattedCollection,
    ],
  )

  return (
    <WalletCollectionContext.Provider value={provider}>{children}</WalletCollectionContext.Provider>
  )
}

export const useWalletCollectionProvider = () => useContext(WalletCollectionContext)
