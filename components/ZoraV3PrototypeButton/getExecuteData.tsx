import { Interface } from "ethers/lib/utils"
import { baseGoerli } from "@wagmi/core/chains"
import abi from "../../lib/abi-ERC6551-account-v3.json"
import getCreateEditionWithReferralData from "./getCreateEditionWithReferralData"
import getZoraCreatorProxyAddress from "./getZoraCreatorProxyAddress"

const getExecuteData = (smartWalletAddress) => {
  const smartWalletIface = new Interface(abi)

  const zoraDropData = getCreateEditionWithReferralData(smartWalletAddress)
  const zoraCreatorProxyOPGoerli = getZoraCreatorProxyAddress(baseGoerli.id)
  const value = 0

  return smartWalletIface.encodeFunctionData("execute", [
    zoraCreatorProxyOPGoerli,
    value,
    zoraDropData,
    0,
  ])
}

export default getExecuteData
