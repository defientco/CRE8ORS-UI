/* eslint-disable no-nested-ternary */
import { FC, useEffect, useState } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import Modal from "../../shared/Modal"
import { Button } from "../../shared/Button"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import Media from "../../shared/Media"
import { useUserProvider } from "../../providers/UserProvider"
import getIpfsLink from "../../lib/getIpfsLink"
import Icon from "../../shared/Icon"

interface SwitchSmartWalletModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}
const SwitchSmartWalletModal: FC<SwitchSmartWalletModalProps> = ({
  isModalVisible,
  toggleIsVisible,
}) => {
  const { setIsViewAll, setShouldSelectNewPFP } = useWalletCollectionProvider()
  const { metaData, smartWalletAddress } = useUserProvider()
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isCopied)
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
  }, [isCopied])

  return (
    <Modal
      id="switch_smart_wallet"
      isVisible={isModalVisible}
      onClose={toggleIsVisible}
      containerClassName="!rounded-[20px] md:!rounded-[30px] overflow-hidden 
        !bg-[#f1eeee]
        drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
      modalClassName="!z-[110]"
      showCloseButton
    >
      <div
        className="!p-[16px]
            flex-col flex justify-center items-center
            gap-y-[20px]
            md:w-[360px] md:h-[239px]
            bg-[#f1eeee]"
      >
        <div
          className="flex flex-col items-center
        gap-y-[5px]"
        >
          <Media
            type="image"
            link={getIpfsLink(metaData?.image)}
            blurLink={getIpfsLink(metaData?.image)}
            containerClasses="w-[74px] h-[74px] rounded-full overflow-hidden"
          />
          <p className="font-quicksand font-bold text-[18px]">
            {smartWalletAddress
              ? `${smartWalletAddress.slice(0, 4)}...${smartWalletAddress.slice(
                  smartWalletAddress.length - 4,
                  smartWalletAddress.length,
                )}`
              : ""}
          </p>
        </div>
        <div className="flex items-center gap-x-[10px]">
          <CopyToClipboard text={smartWalletAddress}>
            <Button
              id="copy_address_btn"
              className="!w-[158px] !h-[50px]
                  md:!w-[158px] md:!h-[53px]
                  !p-0 !rounded-[10px]
                  flex !flex-col !gap-y-[2px]
                  !bg-[white] !capitalize
                  !text-black !text-[12px]"
              onClick={() => setIsCopied(true)}
            >
              <Icon name={isCopied ? "check" : "copy"} size={20} color="black" raw />
              {isCopied ? "Copied!" : "Copy Address"}
            </Button>
          </CopyToClipboard>
          <Button
            id="swith_smart_wallet_btn"
            className="!w-[158px] !h-[50px]
                md:!w-[158px] md:!h-[53px]
                !p-0 !rounded-[10px]
                flex !flex-col !gap-y-[2px]
                !bg-[white] !capitalize
                !text-black !text-[12px]"
            onClick={() => {
              setIsViewAll(false)
              setShouldSelectNewPFP(true)
              toggleIsVisible()
            }}
          >
            <Icon name="switch" size={20} color="black" raw />
            Switch Smart Wallet
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default SwitchSmartWalletModal
