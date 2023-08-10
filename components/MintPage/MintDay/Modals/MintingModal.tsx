import Modal from "../../../../shared/Modal"
import MintLoading from "../MintLoading"

const MintingModal = () => (
  <Modal isVisible onClose={null}>
    <div
      className="px-6 samsungS8:px-10 py-8 rounded-lg
                      flex-col flex justify-center items-center
                      bg-[url('/assets/Mint/MintNow/MintCoreModal/combination_bg.png')]
                      bg-cover bg-black dark:bg-white 
                      xl:w-[600px] xl:h-[500px]"
    >
      <MintLoading />
    </div>
  </Modal>
)

export default MintingModal
