import { FC } from "react"
import Modal from "../../shared/Modal"
import { Button } from "../../shared/Button"

interface TrainModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}
const TrainModal: FC<TrainModalProps> = ({ isModalVisible, toggleIsVisible }) => (
  <Modal
    isVisible={isModalVisible}
    onClose={toggleIsVisible}
    containerClassName="rounded-[56px] overflow-hidden bg-black"
  >
    <div
      className="p-2 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
        flex-col flex justify-center items-center
        md:w-[692px] md:h-[528px]
        bg-black"
    >
      <div className="font-eigerdals text-[65px] text-white uppercase">Soft-staking</div>
      <pre
        className="font-quicksand text-[33px] font-bold text-white my-[60px]
        text-center leading-[99.3%]"
      >
        {`Train (soft-stake) your Cre8or\nto learn AI, earn badges, and\nreceive rewards!`}
      </pre>
      <Button
        id="unlock_btn"
        className="w-[397px] h-[77px]
        font-quicksand font-bold text-[39px]
        rounded-[15px]
        !p-0"
      >
        start trainning
      </Button>
    </div>
  </Modal>
)

export default TrainModal
