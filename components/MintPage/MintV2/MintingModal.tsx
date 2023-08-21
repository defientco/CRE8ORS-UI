import Modal from "../../../shared/Modal"
import MintLoading from "./MintLoading"

const MintingModal = () => (
  <Modal
    isVisible
    onClose={() => {}}
    containerClassName="!rounded-[15px] md:!rounded-[20px] overflow-hidden"
  >
    <div
      className="p-4
                flex-col flex justify-center items-center
                bg-black
                xl:w-[500px] xl:h-[425px]"
    >
      <MintLoading />
    </div>
  </Modal>
)

export default MintingModal
