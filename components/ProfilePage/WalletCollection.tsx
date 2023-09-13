import { useMediaQuery } from "usehooks-ts"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import Media from "../../shared/Media"
import { useProfileProvider } from "../../providers/ProfileContext"
import SmartWalletContents from "./SmartWalletContents"
import OwnerWalletContents from "./OwnerWalletContents"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import SmartWalletButtons from "./SmartWalletButtons"
import { useUserProvider } from "../../providers/UserProvider"
import SwitchingLoadingModal from "./SwitchingLoadingModal"

const WalletCollection = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { cre8orNumber, smartWalletAddress, smartWalletBalance } = useUserProvider()
  const { expandedMore, setExpandedMore, isHiddenEditable } = useProfileProvider()

  const { isViewAll, setIsViewAll, isUpdatingSmartWallet } = useWalletCollectionProvider()

  const copyReferralLink = () => {
    if (!smartWalletAddress) {
      toast.error(
        isHiddenEditable ? "Smart wallet has not been set up yet" : "Setup smart wallet first",
      )
      return
    }

    toast.success("Link copied to clipboard")
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`${
          !expandedMore
            ? `${
                isMobile ? "mobile_un_expand_more" : "un_expand_more"
              } h-[35px] lg:h-[55px] overflow-hidden bg-black`
            : `${
                isMobile ? "mobile_expand_more" : "expand_more"
              } h-[215px] samsungS8:h-[220px] lg:h-[415px]
              bg-black`
        } 
          rounded-t-[10px] lg:rounded-t-[20px]
          w-full
          lg:px-10
          px-2 pt-[10px]
          mt-[20px]`}
      >
        <div
          className="w-full flex justify-between items-start
        samsungS8:gap-x-[10px]"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-x-[5px] md:gap-x-[10px]">
              {!isHiddenEditable && <SmartWalletButtons />}
              <p
                className="text-[9px] text-white
                samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
                uppercase"
              >
                SMART WALLET
              </p>
              <button type="button" onClick={() => setExpandedMore(!expandedMore)}>
                <Media
                  type="image"
                  containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
                  link={`${
                    expandedMore ? "/assets/Profile/arrow_up.svg" : "/assets/Profile/arrow_down.svg"
                  }`}
                  blurLink={`${
                    expandedMore ? "/assets/Profile/arrow_up.png" : "/assets/Profile/arrow_down.png"
                  }`}
                />
              </button>
            </div>
            {smartWalletBalance > 0 && (
              <div
                className="flex items-center bg-white w-fit
            mt-[10px] lg:mt-[15px] gap-x-[5px]
            p-1 rounded-[5px]"
              >
                <Media
                  type="image"
                  link="/assets/Profile/eth.svg"
                  blurLink="/assets/Profile/eth.svg"
                  containerClasses="lg:w-[18px] lg:h-[18px]
                  w-[10px] h-[10px]
                  rounded-full"
                />
                <p className="text-[9px] lg:text-[14px] font-quicksand font-bold">
                  {smartWalletAddress
                    ? `${smartWalletAddress.slice(0, 4)}...${smartWalletAddress.slice(
                        smartWalletAddress.length - 4,
                        smartWalletAddress.length,
                      )}(${smartWalletBalance})`
                    : ""}
                </p>
              </div>
            )}
            <SmartWalletContents />
          </div>
          <div>
            <div
              className={`flex items-center ${
                !expandedMore || isMobile ? "justify-end" : "justify-between"
              }
            xl:min-w-[641px]`}
            >
              {!isMobile && expandedMore && (
                <div
                  className="flex font-quicksand font-bold
                gap-[15px]"
                >
                  <div className="text-white uppercase">Wallet</div>
                  <div className="flex justify-center w-16 h-6 cursor-pointer">
                    <button
                      type="button"
                      className="flex items-center bg-[white] rounded-full w-full h-6 pl-2"
                      onClick={() => setIsViewAll(!isViewAll)}
                    >
                      <div
                        className={`${
                          !isViewAll ? "translate-x-[calc(100%+11px)]" : "translate-x-[-5px]"
                        } 
                        bg-[black]
                        w-5 h-5 rounded-full 
                        transition duration-[300ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
                      />
                    </button>
                  </div>
                  <div className="text-white uppercase">CRE8ORS</div>
                </div>
              )}
              <div className="flex gap-x-[10px] items-center">
                <p
                  className="text-[9px] text-white
                  samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
                  uppercase"
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
                        : "/assets/Profile/arrow_down.svg"
                    }`}
                    blurLink={`${
                      expandedMore
                        ? "/assets/Profile/arrow_up.png"
                        : "/assets/Profile/arrow_down.png"
                    }`}
                  />
                </button>
              </div>
            </div>
            <OwnerWalletContents />
          </div>
        </div>
        {cre8orNumber && (
          <CopyToClipboard text={`https://cre8ors.com/mint?referral=${cre8orNumber}`}>
            <button
              type="button"
              className="font-quicksand text-white samsungS8:py-[5px]
          text-[5px] lg:text-[12px] cursor-copy"
              onClick={copyReferralLink}
            >
              Affiliate Link: {`https://cre8ors.com/mint?referral=${cre8orNumber}`}
            </button>
          </CopyToClipboard>
        )}
      </div>
      {isUpdatingSmartWallet && <SwitchingLoadingModal />}
    </DndProvider>
  )
}

export default WalletCollection
