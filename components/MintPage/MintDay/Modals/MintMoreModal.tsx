import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import Modal from "../../../../shared/Modal"
import Media from "../../../../shared/Media"
import MintModalCTAButton from "../MintModalCTAButton"
import IMintModal from "./IMintModal"
import { useMintProvider } from "../../../../providers/MintProvider"

interface MintMoreModalProps extends IMintModal {}

const MintMoreModal: FC<MintMoreModalProps> = ({ isModalVisible, toggleIsVisible }) => {
  const { address } = useAccount()

  const isXl = useMediaQuery("(max-width: 1150px)")

  const { leftQuantityCount, lockedCntOfCre8or } = useMintProvider()

  const text = `The first rule of the @cre8orsNFT cabal is don't tweet about the cabal.`

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
            xl:pt-[25px]
            xl:pb-[40px]
            py-[15px]
            leading-[110.3%]
            dark:text-black text-white"
        >
          {`You have ${leftQuantityCount || 0} mints available\nClose popup to mint more`}
        </pre>
        <MintModalCTAButton
          id="share_tweet_btn"
          label="Share tweet"
          link={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`}
          target="_blank"
          className="mb-[15px]"
        />
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
      </div>
    </Modal>
  )
}

export default MintMoreModal
