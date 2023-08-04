import { FC } from "react"
import Modal from "../../shared/Modal"
import { Button } from "../../shared/Button"

interface UnlockModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}
const UnlockModal: FC<UnlockModalProps> = ({ isModalVisible, toggleIsVisible }) => (
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
      <div className="font-eigerdals text-[65px] text-white uppercase">Locked Until X.</div>
      <div className="font-quicksand text-[42px] font-bold text-white mt-[100px] mb-[90px]">
        Unlock for X ETH.
      </div>
      <Button
        id="unlock_btn"
        className="w-[255px] h-[77px]
        font-quicksand font-bold text-[39px]
        rounded-[15px]
        !p-0"
      >
        unlock
      </Button>
    </div>
  </Modal>
)

export default UnlockModal
