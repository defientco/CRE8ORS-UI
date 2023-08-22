import Modal from "../../../shared/Modal"
import Media from "../../../shared/Media"
import MintModalCTAButton from "./MintModalCTAButton"

const SuccessModal = ({ isModalVisible, toggleIsVisible, cre8orNumber }) => {
  const text = `Just minted my @cre8orsNFT`
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
          containerClasses="md:w-[400px] md:h-[160px]
          w-[280px] h-[100px]"
        />
        <pre
          className="font-quicksand 
            text-[15px] xl:text-[25px]
            text-center 
            dark:text-black text-white
            leading-[103.3%]"
        >
          {`#${cre8orNumber}`} Cre8or DNA Secured.
        </pre>
        <Media
          link="/assets/Common/dna_animation.gif"
          blurLink="/assets/Common/dna_animation.gif"
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
          link="/profile/"
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