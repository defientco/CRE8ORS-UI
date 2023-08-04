import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useRouter } from "next/router"
import Media from "../../shared/Media"
import UnlockModal from "./UnlockModal"
import TrainModal from "./TrainModal"
import { useProfileProvider } from "../../providers/ProfileContext"
import getNFTs from "../../lib/alchemy/getNFTs"

const PreWalletCollection = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const router = useRouter()
  const { expandedMore, setExpandedMore, isEditable } = useProfileProvider()
  const { address } = router.query as any
  const [ownedNfts, setOwnedNfts] = useState([])
  const [openUnlockModal, setOpenUnlockModal] = useState(false)
  const [openTraninModal, setOpenTrainModal] = useState(false)

  useEffect(() => {
    const init = async () => {
      const response = await getNFTs(address, null, process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)

      // Transformation of the raw data
      const formattedData = response.ownedNfts.map((nft) => ({
        label: nft.contractMetadata.name, // You can change this according to your specific requirements
        type:
          nft.contract.address === process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS ? "cre8or" : undefined,
        isLocked: true,
        image: nft.media[0].thumbnail,
        // Add additional properties if needed
      }))

      // Set the state
      setOwnedNfts(formattedData)
    }
    init()
  }, [address])

  const toggleUnlockModal = () => {
    setOpenUnlockModal(!openUnlockModal)
  }
  const toggleTraninModal = () => {
    setOpenTrainModal(!openTraninModal)
  }

  return (
    <>
      <div
        className={`${
          !expandedMore
            ? `${
                isMobile ? "mobile_un_expand_more" : "un_expand_more"
              } h-[55px] lg:h-[70px] overflow-hidden`
            : `${isMobile ? "mobile_expand_more" : "expand_more"} h-[220px] lg:h-[415px]
              bg-black`
        } 
          rounded-t-[10px] lg:rounded-t-[20px]
          w-full flex justify-between items-start mt-[20px] pt-[20px]
          gap-x-[10px]
          lg:px-10 lg:pb-10
          px-2 pb-2`}
      >
        <div>
          <div className="flex items-center gap-x-[5px] samsungS8:gap-x-[10px]">
            <Media
              type="image"
              containerClasses="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"
              link={`${
                expandedMore ? "/assets/Profile/help.svg" : "/assets/Profile/black_help.svg"
              }`}
              blurLink={`${
                expandedMore ? "/assets/Profile/help.png" : "/assets/Profile/black_help.png"
              }`}
            />
            <p
              className={`${
                expandedMore ? "text-white" : "text-black"
              } text-[9px] samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
              uppercase`}
            >
              SMART WALLET
            </p>
            <button type="button" onClick={() => setExpandedMore(!expandedMore)}>
              <Media
                type="image"
                containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
                link={`${
                  expandedMore
                    ? "/assets/Profile/arrow_up.svg"
                    : "/assets/Profile/black_arrow_down.svg"
                }`}
                blurLink={`${
                  expandedMore
                    ? "/assets/Profile/arrow_up.png"
                    : "/assets/Profile/black_arrow_down.png"
                }`}
              />
            </button>
          </div>
          <div className="border-r-[2px] pr-[20px] lg:pr-[50px] border-r-[white]">
            <div
              className="mt-[35px]
                    relative
                    flex items-center justify-center
                    lg:px-4 lg:py-6 p-2
                    rounded-[8px] lg:rounded-[15px]
                    overflow-hidden
                    lg:w-[287px] lg:h-[287px]
                    samsungS8:w-[130px] samsungS8:h-[130px]
                    w-[120px] h-[120px]
                    after:content-[''] after:bg-[white] after:opacity-[0.3]
                    after:w-full after:h-full
                    after:absolute
                    after:left-0 after:top-0 after:z-[1]"
            >
              <div
                className="absolute w-full h-full left-0 top-0 z-[2]
              bg-[url('/assets/Profile/dna_animation.gif')] bg-cover"
              />
              <div
                className="grid grid-cols-3 w-full relative z-[2]
                        gap-y-[5px] lg:gap-y-[15px]"
              >
                {[...Array(9)].map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="flex justify-center" key={i}>
                    <div
                      className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[69px] lg:h-[67px] rounded-[5px] lg:rounded-[8px] bg-[#ffffffb5]
                                        drop-shadow-[0_4px_4px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end gap-x-[5px] samsungS8:gap-x-[10px]">
            <p
              className={`${
                expandedMore ? "text-white" : "text-black"
              } text-[9px] samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
              uppercase`}
            >
              VIEW COLLECTION
            </p>
            <button type="button" onClick={() => setExpandedMore(!expandedMore)}>
              <Media
                type="image"
                containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
                link={`${
                  expandedMore
                    ? "/assets/Profile/arrow_up.svg"
                    : "/assets/Profile/black_arrow_down.svg"
                }`}
                blurLink={`${
                  expandedMore
                    ? "/assets/Profile/arrow_up.png"
                    : "/assets/Profile/black_arrow_down.png"
                }`}
              />
            </button>
          </div>
          <div
            className="grid grid-cols-3 xs:grid-cols-4 lg:grid-cols-6 gap-x-[3px] lg:gap-x-[15px] gap-y-[5px] pt-[15px] mt-[20px]
                  h-[140px] lg:h-[287px] 
                  overflow-y-auto overflow-x-hidden
                  pr-2"
          >
            {ownedNfts.map((data, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} className="flex flex-col items-center gap-y-[5px]">
                {data.image ? (
                  <img
                    className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[93px] lg:h-[93px] bg-white rounded-[5px] lg:rounded-[15px]"
                    src={data.image}
                    alt={data.label}
                  />
                ) : (
                  <div className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[93px] lg:h-[93px] bg-white rounded-[5px] lg:rounded-[15px]" />
                )}{" "}
                <div
                  className="text-[6px] samsungS8:text-[7px] xs:text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                              w-[30px] samsungS8:w-[40px] lg:!w-[90px] text-center
                              flex flex-col items-center gap-y-[2px]"
                >
                  <div className="w-full">{data.label}</div>
                  {isEditable && (
                    <div>
                      {data.type === "cre8or" &&
                        (data.isLocked ? (
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
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <UnlockModal isModalVisible={openUnlockModal} toggleIsVisible={toggleUnlockModal} />
      <TrainModal isModalVisible={openTraninModal} toggleIsVisible={toggleTraninModal} />
    </>
  )
}

export default PreWalletCollection
