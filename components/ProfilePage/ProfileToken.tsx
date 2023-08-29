import { useDrag } from "react-dnd"
import { useRef } from "react"
import { useAccount } from "wagmi"
import Media from "../../shared/Media"
import { ItemTypes } from "./ItemTypes"
import useShakeEffect from "../../hooks/useShakeEffect"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import { updateUserCre8orNumber } from "../../lib/userInfo"
import { useUserProvider } from "../../providers/UserProvider"

const ProfileToken = ({ token }) => {
  const { shouldSelectNewPFP, setShouldSelectNewPFP } = useWalletCollectionProvider()
  const { getUserData } = useUserProvider()

  const { address } = useAccount()

  const tokenRef = useRef()

  useShakeEffect({
    ref: tokenRef,
    isForever: shouldSelectNewPFP,
  })

  const openseaUrl = process.env.NEXT_PUBLIC_TESTNET
    ? "https://testnets.opensea.io/assets/goerli"
    : "https://opensea.io/assets/ethereum"

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CRE8OR,
    item: { token },
    end: () => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1

  const handleClickPFP = async () => {
    if (!shouldSelectNewPFP) {
      window.open(`${openseaUrl}/${token.contractAddress}/${token.tokenId}`, "_blank")
      return
    }

    setShouldSelectNewPFP(false)

    await updateUserCre8orNumber({
      walletAddress: address,
      cre8orNumber: token?.tokenId,
    })

    await getUserData(address)
  }

  return (
    <div ref={tokenRef} className="rounded-[5px] lg:rounded-[15px] overflow-hidden">
      <button
        type="button"
        onClick={handleClickPFP}
        className="z-[10] rounded-[5px] lg:rounded-[15px] overflow-hidden"
        style={{
          opacity,
        }}
        ref={drag}
      >
        {token.image ? (
          <Media
            type="image"
            blurLink={token.image}
            link={token.image}
            alt={token.label}
            containerClasses="w-[30px] h-[30px] 
            samsungS8:w-[35px] samsungS8:h-[35px] 
            lg:w-[93px] lg:h-[93px] 
            bg-white overflow-hidden
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <div
            className="w-[30px] h-[30px] 
            samsungS8:w-[35px] samsungS8:h-[35px] 
            lg:w-[93px] lg:h-[93px] 
            bg-white 
            rounded-[5px] lg:rounded-[15px]
            overflow-hidden"
          />
        )}
      </button>
    </div>
  )
}

export default ProfileToken
