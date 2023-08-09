import { Contract } from "ethers"
import { Button } from "../../shared/Button"
import abi from "../../lib/abi-dna-minter.json"
import { useProfileProvider } from "../../providers/ProfileContext"
import { useEthersSigner } from "../../hooks/useEthersSigner"

const Deploy6551AndMintDNAButton = () => {
  const { cre8orNumber } = useProfileProvider()
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })

  const onClick = async () => {
    const dnaMinter = process.env.NEXT_PUBLIC_DNA_MINTER
    const contract = new Contract(dnaMinter, abi, signer)
    const tx = await contract.createTokenBoundAccountAndMintDNA(cre8orNumber)
    await tx.wait()
  }

  return (
    <Button
      onClick={onClick}
      id="deploy-wallet"
      className="absolute w-full h-full left-0 top-0 z-[3]"
    >
      setup smart wallet
    </Button>
  )
}

export default Deploy6551AndMintDNAButton
