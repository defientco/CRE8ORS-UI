import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { CRE8OR } from "../ProfilePage/types"
import ProfileToken from "./ProfileToken"
import getNFTs from "../../lib/alchemy/getNFTs"
import getFormattedCollection from "../../lib/getFormattedCollection"

const OwnerWalletCre8ors = () => {
  const { address } = useAccount()
  const [ownedNfts, setOwnedNfts] = useState([])

  useEffect(() => {
    const init = async () => {
      const response = await getNFTs(
        address,
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        process.env.NEXT_PUBLIC_TESTNET ? 5 : 1,
      )
      setOwnedNfts(getFormattedCollection(response.ownedNfts))
    }

    if (!address) return
    init()
  }, [address])

  return (
    <div
      className="mt-[15px] grid grid-cols-3 xs:grid-cols-4 lg:grid-cols-6 
        gap-x-[5px] lg:gap-x-[15px] gap-y-[5px] 
        h-[120px] lg:h-[290px] 
        overflow-y-auto overflow-x-hidden
        pr-2"
    >
      {ownedNfts.map((data, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex flex-col items-center gap-y-[5px]">
          <ProfileToken token={data} />
          <div
            className="text-[6px] samsungS8:text-[7px] xs:text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                                w-[30px] samsungS8:w-[40px] lg:!w-[90px] text-center
                                flex flex-col items-center gap-y-[2px]"
          >
            <div className="w-full break-words uppercase">
              {data.type === CRE8OR ? "CRE8ORS" : data.label}
              {data.type === CRE8OR ? ` #${data.tokenId}` : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OwnerWalletCre8ors
