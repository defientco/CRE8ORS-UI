import { useAccount } from "wagmi"
import { useRef } from "react"
import _ from "lodash"
import { Button } from "../../../../shared/Button"
import WalletConnectButton from "../../../WalletConnectButton"
import { useMintProvider } from "../../../../providers/MintProvider"
import useShakeEffect from "../../../../hooks/useShakeEffect"

const MintBoardButtons = ({ setOpenModal }: any) => {
  const { isConnected } = useAccount()

  const { cart, leftQuantityCount } = useMintProvider()

  const shakeRef = useRef()

  useShakeEffect({
    ref: shakeRef,
    isEnabled: _.sum(cart) === 0 || leftQuantityCount === 0,
  })

  const handleClick = () => {
    if (_.sum(cart)) setOpenModal(true)
  }

  return (
    <div className="flex justify-center">
      {isConnected ? (
        <div ref={shakeRef}>
          <Button
            id="mint_btn_mint_page"
            className="mt-[20px] xl:mt-[40px] 
          xl:w-[308px] xl:h-[88px] 
          w-[133px] h-[38px]
          text-[14px] xl:text-[30px] 
          rounded-[5px] xl:rounded-[15px]"
            onClick={handleClick}
          >
            {leftQuantityCount ? "Mint Now" : "Max Minted"}
          </Button>
        </div>
      ) : (
        <WalletConnectButton>
          <div
            className="px-0 py-0
          mt-[40px] uppercase
          xl:w-[328px] xl:h-[88px] 
          w-[153px] h-[38px]
          text-[14px] xl:text-[30px] 
          rounded-[5px] xl:rounded-[15px]
          hover:scale-[1.1] scale-[1] transition duration-[300ms]
          bg-[black] dark:bg-[white] 
          shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
          flex items-center justify-center gap-[10px]
          font-bold font-quicksand"
          >
            Connect Wallet
          </div>
        </WalletConnectButton>
      )}
    </div>
  )
}

export default MintBoardButtons
