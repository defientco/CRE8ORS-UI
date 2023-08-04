import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import { Button } from "../../../../shared/Button"
import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"
import Media from "../../../../shared/Media"
import MintModalCTAButton from "../MintModalCTAButton"
import IMintModal from "./IMintModal"
import { useMintProvider } from "../../../../providers/MintProvider"

interface MintMoreModalProps extends IMintModal {}

const MintMoreModal: FC<MintMoreModalProps> = ({ isModalVisible, toggleIsVisible, loading }) => {
  const { address } = useAccount()

  const isXl = useMediaQuery("(max-width: 1150px)")

  const { leftQuantityCount, lockedCntOfCre8or } = useMintProvider()

  const handleClick = async () => {
    toggleIsVisible()
  }

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className={`${
          leftQuantityCount ? "px-8" : "px-4"
        } py-8 samsungS8:p-8 xl:py-16 xl:px-0 rounded-lg
        flex-col flex justify-center items-center
        bg-[url('/assets/Mint/MintNow/MintCoreModal/mint_more_bg.png')]
        bg-cover bg-black dark:bg-white`}
        style={{
          width: isXl ? "100%" : "500px",
        }}
      >
        {loading ? (
          <MintLoading />
        ) : (
          <>
            <pre
              className="font-eigerdals 
                text-[30px] xs:text-[33px] xl:text-[55px] 
                uppercase text-center
                leading-[70.3%]
                dark:text-black text-white"
            >
              Congrats!
            </pre>
            <pre
              className="font-quicksand 
                text-[15px] xl:text-[25px]
                text-center 
                xl:pb-[25px]
                pb-[5px]
                dark:text-black text-white"
            >
              Cre8or DNA Secured.
            </pre>
            <Media
              link="/assets/Mint/MintNow/MintCoreModal/mint_avatar.svg"
              blurLink="/assets/Mint/MintNow/MintCoreModal/mint_avatar.png"
              type="image"
              containerClasses="xl:w-[192.3px] xl:h-[192.3px]
          w-[125px] h-[125px]"
            />
            <pre
              className="font-quicksand 
                text-[15px] xl:text-[25px]
                text-center 
                xl:py-[25px]
                py-[15px]
                leading-[90.3%]
                dark:text-black text-white"
            >
              {`You have ${leftQuantityCount || 0} more\nmints available`}
            </pre>
            {leftQuantityCount ? (
              <div>
                <Button
                  id="mint_now"
                  className="!px-0 !py-0
                  xl:!w-[192.3px] xl:!h-[50px] 
                  !w-[150px] !h-[40px]
                  !font-eigerdals font-bold !bg-black 
                  text-[15px] xl:text-[20px] 
                  !rounded-[10px]
                  !text-black dark:!text-white
                  dark:!bg-black !bg-white"
                  onClick={handleClick}
                >
                  Mint More
                </Button>
                <pre
                  className="font-quicksand 
                    text-[15px] xl:text-[20px]
                    py-[10px]
                    text-center"
                >
                  OR
                </pre>
              </div>
            ) : (
              // eslint-disable-next-line react/jsx-no-useless-fragment
              <></>
            )}
            {lockedCntOfCre8or ? (
              <MintModalCTAButton link="/staking" id="stake_link_btn" label="Enter warehouse" />
            ) : (
              <MintModalCTAButton
                link={`/profile/${address}`}
                id="profile_link_btn"
                label="set up profile"
                target="_blank"
              />
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

export default MintMoreModal
