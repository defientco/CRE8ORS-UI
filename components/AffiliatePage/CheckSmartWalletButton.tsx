import { toast } from "react-toastify"
import { useUserProvider } from "../../providers/UserProvider"
import { Button } from "../../shared/Button"
import Checkbox from "../../shared/Checkbox"

const CheckSmartWalletButton = () => {
  const { smartWalletAddress } = useUserProvider()

  return (
    <div className="flex gap-x-[15px] w-[280px]">
      <Button
        id="set_smart_wallet"
        onClick={() => {
          if (smartWalletAddress) {
            toast.info("Smart wallet is already setup.")
            return
          }

          window.open("/profile", "_blank")
        }}
        className="!p-0
                w-[240px] h-[46px]"
      >
        Setup Smart Wallet
      </Button>
      <Checkbox id="checked_smart_wallet" checked={smartWalletAddress} readOnly />
    </div>
  )
}

export default CheckSmartWalletButton
