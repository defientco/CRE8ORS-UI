/* eslint-disable no-nested-ternary */
import Modal from "../../shared/Modal"

const NewCre8orNumberModal = ({ isModalVisible, toggleVisible }) => (
  <Modal
    id="train_modal"
    isVisible={isModalVisible}
    onClose={toggleVisible}
    containerClassName="rounded-[30px] overflow-hidden bg-black
      drop-shadow-[2px_3px_2px_rgba(255,255,255,0.25)]"
    modalClassName="!z-[110]"
    showCloseButton
  >
    <div
      className="flex-col flex justify-center items-center
          !w-[310px] h-[150px]
          bg-white"
    >
      <pre
        className="font-quicksand 
            text-[20px]
            font-bold
            text-center leading-[99.3%]
            w-[260px] md:w-full"
      >
        Select a new main cre8or
      </pre>
    </div>
  </Modal>
)

export default NewCre8orNumberModal
