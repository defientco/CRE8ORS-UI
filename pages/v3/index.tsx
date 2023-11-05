import { ConnectButton } from "@rainbow-me/rainbowkit"
import ZoraV3PrototypeButton from "../../components/ZoraV3PrototypeButton"
import { useEthersSigner } from "../../hooks/useEthersSigner"

const V3 = () => {
  const signer = useEthersSigner()

  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center border justify-center text-center text-white">
      {signer ? <ZoraV3PrototypeButton /> : <ConnectButton />}
    </div>
  )
}

export default V3
