import { FC } from "react"
import { Button } from "../../../shared/Button"
import Modal from "../../../shared/Modal"
import Media from "../../../shared/Media"

interface DetectedFriendFamilyModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
  mintCre8or: () => void
  loading: boolean
}

const DetectedFriendFamilyModal: FC<DetectedFriendFamilyModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  mintCre8or,
  loading,
}) => (
  <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
    <div
      className="p-8 xl:p-14 rounded-lg
                flex-col flex justify-center items-center
                bg-[url('/assets/Mint/MintNow/MintCoreModal/friend_family.png')]
                bg-cover bg-black dark:bg-white"
    >
      <pre
        className="font-eigerdals 
                text-[22px] samsungS8:text-[25px] xs:text-[28px] xl:text-[55px] 
                uppercase text-center
                leading-[103.3%] dark:text-black text-white"
      >
        {loading ? `Minting Now` : `Friends and family\ndetected:\n\n1 Free Mint!`}
      </pre>
      {loading ? (
        <Media
          type="image"
          link="/assets/Common/loading.svg"
          containerClasses="w-[230px] h-[200px] samsungS8:w-[260px] xs:w-[300px] md:w-[250px] md:h-[250px] z-[3]"
        />
      ) : (
        <pre
          className="font-quicksand 
                text-[15px] xl:text-[32px]
                text-center 
                pt-0 xl:pb-[50px]
                samsungS8:pb-[15px]
                pb-[10px]
                dark:text-black text-white"
        >
          (with 8-month lockup)
        </pre>
      )}
      {loading ? (
        <div
          className="uppercase text-white dark:text-black
          font-quicksand text-[19px] font-bold"
        >
          Loading...
        </div>
      ) : (
        <Button
          id="mint_now"
          className="xl:!w-[348px] xl:!h-[107px] 
                !w-[150px] !h-[50px]
                !font-eigerdals font-bold !bg-black 
                text-[15px] xl:text-[44px] 
                !rounded-[10px]
                !text-black dark:!text-white
                dark:!bg-black !bg-white"
          onClick={mintCre8or}
        >
          Mint Now
        </Button>
      )}
    </div>
  </Modal>
)

export default DetectedFriendFamilyModal
