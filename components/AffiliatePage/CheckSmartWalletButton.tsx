import { toast } from "react-toastify"
import { useUserProvider } from "../../providers/UserProvider"
import { Button } from "../../shared/Button"
import Checkbox from "../../shared/Checkbox"

const CheckSmartWalletButton = () => {
  const { hasSmartWallet } = useUserProvider()

  return (
    <div className="flex gap-x-[15px]">
      <Button
        id="set_smart_wallet"
        onClick={() => {
          if (hasSmartWallet) {
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
      <Checkbox id="owned_cre8or" checked={hasSmartWallet} readOnly />
    </div>
  )
}

export default CheckSmartWalletButton