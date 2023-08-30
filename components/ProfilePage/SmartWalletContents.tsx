import { useCallback, useEffect, useMemo, useState } from "react"
import { useDrop } from "react-dnd"
import { useAccount } from "wagmi"
import { useProfileProvider } from "../../providers/ProfileContext"
import getSmartWallet from "../../lib/getSmartWallet"
import getProfileFormattedCollection, { ALLNFTS } from "../../lib/getProfileFormattedCollection"
import getDefaultProvider from "../../lib/getDefaultProvider"
import Deploy6551AndMintDNAButton from "./Deploy6551AndMintButton"
import ProfileToken from "./ProfileToken"
import { useUserProvider } from "../../providers/UserProvider"
import getIpfsLink from "../../lib/getIpfsLink"
import { ItemTypes } from "./ItemTypes"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import useERC721Transfer from "../../hooks/useERC721Transfer"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import TransferLoadingModal from "./TransferLoadingModal"

const SmartWalletContents = () => {
  const { isHiddenEditable } = useProfileProvider()
  const { metaData, cre8orNumber } = useUserProvider()
  const { toggleProfileFormattedCollection } = useWalletCollectionProvider()

  const [ownedNfts, setOwnedNfts] = useState([])
  const [hasSmartWallet, setHasSmartWallet] = useState(true)
  const provider = useMemo(() => getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1), [])
  const { address } = useAccount()
  const { checkNetwork } = useCheckNetwork()

  const [isTransferring, setIsTransferring] = useState(false)

  const getDNAByCre8orNumber = useCallback(async () => {
    if (!provider || !cre8orNumber) return
    const smartWalletAddress = await getSmartWallet(cre8orNumber)
    const code = await provider.getCode(smartWalletAddress)
    setHasSmartWallet(code !== "0x")
    const nftResponse = await getProfileFormattedCollection(smartWalletAddress, ALLNFTS)
    setOwnedNfts(nftResponse)
  }, [cre8orNumber, provider])

  const { transferERC721 } = useERC721Transfer({
    afterTransfer: async () => {
      await toggleProfileFormattedCollection()
      await getDNAByCre8orNumber()
    }
  })

  const dropToSmartWallet = useCallback(async (item) => {
    if (!hasSmartWallet || isHiddenEditable || !cre8orNumber) return
    if (!checkNetwork()) return

    setIsTransferring(true)
    const smartWalletAddress = await getSmartWallet(cre8orNumber)

    await transferERC721(
      item?.token.contractAddress,
      address,
      smartWalletAddress,
      item?.token.tokenId,
    )

    setIsTransferring(false)

  }, [cre8orNumber, transferERC721, checkNetwork])

  useEffect(() => {
    getDNAByCre8orNumber()
  }, [getDNAByCre8orNumber])

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CRE8OR,
      drop: async (item: any) => {
        dropToSmartWallet(item)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }), [dropToSmartWallet])

  return (
    <>
      <div className="border-r-[2px] pr-[20px] lg:pr-[50px] border-r-[white]" ref={drop}>
        <div
          className="mt-[35px]
                      relative
                      flex items-center justify-center
                      lg:px-2 lg:py-6 p-2
                      rounded-[8px] lg:rounded-[15px]
                      overflow-hidden
                      lg:w-[287px] lg:h-[287px]
                      samsungS8:w-[130px] samsungS8:h-[130px]
                      w-[120px] h-[120px]
                      after:content-[''] 
                      after:bg-[black] 
                      after:opacity-[0.2]
                      after:w-full after:h-full
                      after:absolute
                      after:left-0 
                      after:top-0 
                      after:z-[4]"
        >
          {!hasSmartWallet && !isHiddenEditable && (
            <Deploy6551AndMintDNAButton getDNAByCre8orNumber={getDNAByCre8orNumber} />
          )}
          <div
            className="absolute w-full h-full left-0 top-0 z-[2]
                bg-cover"
            style={{
              backgroundImage: `url('${getIpfsLink(metaData?.image)}')`,
            }}
          />
          <div
            className="grid grid-cols-3 w-full relative z-[2]
                gap-[5px]"
          >
            {ownedNfts?.map((nft) => (
              <ProfileToken token={nft} key={nft.label} />
            ))}
          </div>
        </div>
      </div>
      {isTransferring && <TransferLoadingModal />}
    </>
  )
}

export default SmartWalletContents
