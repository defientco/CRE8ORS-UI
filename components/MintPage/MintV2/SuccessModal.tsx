import { useAccount } from "wagmi"
import Modal from "../../../shared/Modal"
import Media from "../../../shared/Media"
import MintModalCTAButton from "./MintModalCTAButton"

const SuccessModal = ({ isModalVisible, toggleIsVisible }) => {
  const { address } = useAccount()
  const text = `The first rule of the @cre8orsNFT cabal is don't tweet about the @cre8orsNFT cabal. 🤫`
  const tweetLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

  return (
    <Modal
      isVisible={isModalVisible}
      onClose={toggleIsVisible}
      showCloseButton
      modalClassName="!pt-[40px]"
      containerClassName="rounded-[15px] md:!rounded-[20px] overflow-hidden"
    >
      <div
        className="bg-black flex flex-col items-center
      px-4 py-2 md:p-8"
      >
        <Media
          type="image"
          link="/assets/MintV2/congrate.svg"
          blurLink="/assets/MintV2/congrate.png"
          containerClasses="md:w-[400px] md:h-[130px]
          w-[280px] h-[100px]"
        />
        <pre
          className="font-quicksand 
            text-[15px] xl:text-[25px]
            text-center 
            dark:text-black text-white
            leading-[103.3%]"
        >
          Cre8or DNA Secured.
        </pre>
        <Media
          link="/assets/Mint/MintNow/MintCoreModal/mint_avatar.svg"
          blurLink="/assets/Mint/MintNow/MintCoreModal/mint_avatar.png"
          type="image"
          containerClasses="xl:w-[192.3px] xl:h-[192.3px]
      w-[125px] h-[125px] 
      md:mt-[20px] md:mb-[40px]
      my-[20px]"
        />
        <MintModalCTAButton id="share_tweet_btn" link={tweetLink} target="_blank">
          <div>
            <p className="!p-0 !m-0 !leading-[120.3%]">Share tweet</p>
          </div>
        </MintModalCTAButton>
        <MintModalCTAButton
          id="share_tweet_btn"
          link={`/profile/${address}`}
          target="_blank"
          className="!mt-[10px]"
        >
          <div>
            <p className="!p-0 !m-0 !leading-[120.3%]">Setup profile</p>
          </div>
        </MintModalCTAButton>
      </div>
    </Modal>
  )
}

export default SuccessModal
