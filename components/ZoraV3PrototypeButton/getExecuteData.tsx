import { Interface } from "ethers/lib/utils"
import abi from "../../lib/abi-ERC6551-account-v3.json"
import getCreateEditionWithReferralData from "./getCreateEditionWithReferralData"

const getExecuteData = (smartWalletAddress) => {
  const smartWalletIface = new Interface(abi)

  const zoraDropData = getCreateEditionWithReferralData(smartWalletAddress)
  const zoraCreatorProxyOPGoerli = "0x3C1ebcF36Ca9DD9371c9aA99c274e4988906c6E3"
  const value = 0

  return smartWalletIface.encodeFunctionData("execute", [
    zoraCreatorProxyOPGoerli,
    value,
    zoraDropData,
    0,
  ])
}

export default getExecuteData
