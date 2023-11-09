import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEthersSigner } from "../../hooks/useEthersSigner"
import ZoraV3PrototypeButton from "../ZoraV3PrototypeButton"
import OwnerWalletCre8ors from "../OwnerWalletCre8ors"
import { useV3Provider } from "../../providers/V3Provider"
import Cre8or from "../OwnerWalletCre8ors/Cre8or"

const V3Page = () => {
  const signer = useEthersSigner()
  const { cre8or } = useV3Provider()
  console.log("SWEETS cre8or", cre8or)
  const mySmartWallet = "0xdA88a6f8Cb3a278c1cfd6a988077435ACcbbF43C"

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-5 items-center border justify-center text-center text-white">
      {!signer && <ConnectButton />}
      {signer && !cre8or && <OwnerWalletCre8ors />}
      {signer && cre8or && <h1>TBA (V3): {mySmartWallet}</h1>}
      {signer && cre8or && <ZoraV3PrototypeButton />}
      {signer && cre8or && <Cre8or cre8or={cre8or} />}
    </div>
  )
}

export default V3Page
