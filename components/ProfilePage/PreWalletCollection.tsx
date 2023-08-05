import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import Media from "../../shared/Media"
import UnlockModal from "./UnlockModal"
import TrainModal from "./TrainModal"
import { useProfileProvider } from "../../providers/ProfileContext"
import SmartWalletContents from "./SmartWalletContents"
import OwnerWalletContents from "./OwnerWalletContents"

const PreWalletCollection = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { expandedMore, setExpandedMore } = useProfileProvider()
  const [openUnlockModal, setOpenUnlockModal] = useState(false)
  const [openTraninModal, setOpenTrainModal] = useState(false)

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
          <SmartWalletContents />
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
          <OwnerWalletContents
            setOpenUnlockModal={setOpenUnlockModal}
            setOpenTrainModal={setOpenTrainModal}
          />
        </div>
      </div>
      <UnlockModal isModalVisible={openUnlockModal} toggleIsVisible={toggleUnlockModal} />
      <TrainModal isModalVisible={openTraninModal} toggleIsVisible={toggleTraninModal} />
    </>
  )
}

export default PreWalletCollection
