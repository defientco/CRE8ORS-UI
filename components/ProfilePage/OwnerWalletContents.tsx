import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import { useProfileProvider } from "../../providers/ProfileContext"
import getProfileFormattedCollection from "../../lib/getProfileFormattedCollection"
import Media from "../../shared/Media"
import { CRE8OR } from "./types"

const OwnerWalletContents = ({ setOpenUnlockModal, setOpenTrainModal, isViewAll }) => {
  const router = useRouter()
  const { isEditable } = useProfileProvider()

  const { address } = router.query as any
  const [ownedNfts, setOwnedNfts] = useState([])

  const toggleProfileFormattedCollection = useCallback(async () => {
    const response = await getProfileFormattedCollection(address, isViewAll ? 2 : 1)

    setOwnedNfts(response)
  }, [isViewAll, address])

  useEffect(() => {
    toggleProfileFormattedCollection()
  }, [toggleProfileFormattedCollection])

  return (
    <div
      className="grid grid-cols-3 xs:grid-cols-4 lg:grid-cols-6 
                  gap-x-[5px] lg:gap-x-[15px] gap-y-[5px] 
                  pt-[15px] mt-[20px]
                  h-[140px] lg:h-[287px] 
                  overflow-y-auto overflow-x-hidden
                  pr-2"
    >
      {ownedNfts.map((data, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex flex-col items-center gap-y-[5px]">
          {data.image ? (
            <Media
              type="image"
              blurLink={data.image}
              link={data.image}
              alt={data.label}
              containerClasses="w-[30px] h-[30px] 
              samsungS8:w-[35px] samsungS8:h-[35px] 
              lg:w-[93px] lg:h-[93px] 
              bg-white overflow-hidden
              rounded-[5px] lg:rounded-[15px]"
            />
          ) : (
            <div className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[93px] lg:h-[93px] bg-white rounded-[5px] lg:rounded-[15px]" />
          )}
          <div
            className="text-[6px] samsungS8:text-[7px] xs:text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                              w-[30px] samsungS8:w-[40px] lg:!w-[90px] text-center
                              flex flex-col items-center gap-y-[2px]"
          >
            <div className="w-full break-words">
              {data.label}
              {data.type === CRE8OR ? ` #${data.tokenId}` : ""}
            </div>
            {isEditable && data.type === CRE8OR && data.isLocked !== undefined && (
              <div>
                {data.isLocked ? (
                  <button type="button" onClick={() => setOpenUnlockModal(true)}>
                    <Media
                      type="image"
                      containerClasses="w-[13.54px] h-[16.83px]"
                      link="/assets/Profile/locked.svg"
                      blurLink="/assets/Profile/locked.png"
                    />
                  </button>
                ) : (
                  <button onClick={() => setOpenTrainModal(true)} type="button">
                    <Media
                      type="image"
                      containerClasses="w-[14.8px] h-[17px]"
                      link="/assets/Profile/unlocked.svg"
                      blurLink="/assets/Profile/unlocked.png"
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OwnerWalletContents
