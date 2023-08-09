import { Contract } from "ethers"
import { FC, useState } from "react"
import { Button } from "../../shared/Button"
import abi from "../../lib/abi-dna-minter.json"
import { useProfileProvider } from "../../providers/ProfileContext"
import { useEthersSigner } from "../../hooks/useEthersSigner"
import SettingSmartWalletModal from "./SettingSmartWalletModal"
import useCheckNetwork from "../../hooks/useCheckNetwork"

interface Deploy6551AndMintDNAButtonProps {
  getDNAByCre8orNumber: any
}

const Deploy6551AndMintDNAButton: FC<Deploy6551AndMintDNAButtonProps> = ({
  getDNAByCre8orNumber,
}) => {
  const { cre8orNumber } = useProfileProvider()
  const { checkNetwork } = useCheckNetwork()

  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
  const [openLoadingModal, setOpenLoadingModal] = useState(false)

  const onClick = async () => {
    if (!checkNetwork()) return

    setOpenLoadingModal(true)
    const dnaMinter = process.env.NEXT_PUBLIC_DNA_MINTER
    const contract = new Contract(dnaMinter, abi, signer)
    const tx = await contract.createTokenBoundAccountAndMintDNA(cre8orNumber)
    await tx.wait()
    getDNAByCre8orNumber()
    setOpenLoadingModal(false)
  }

  return (
    <>
      <Button
        onClick={onClick}
        id="deploy-wallet"
        className="absolute w-full h-full left-0 top-0 z-[3]"
      >
        setup smart wallet
      </Button>
      <SettingSmartWalletModal
        isModalVisible={openLoadingModal}
        toggleIsVisible={() => setOpenLoadingModal(!openLoadingModal)}
      />
    </>
  )
}

export default Deploy6551AndMintDNAButton
