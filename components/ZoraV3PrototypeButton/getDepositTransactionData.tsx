import { Interface } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import abi from "../../lib/abi-optimism-portal.json"
import getExecuteData from "./getExecuteData"

const getDepositTransactionData = (smartWalletAddress) => {
  const optimismPortalAbiIface = new Interface(abi)

  const to = smartWalletAddress
  const value = 0
  const gasLimit = BigNumber.from("1201676")
  const isCreation = false
  const optimismPortalData = getExecuteData(smartWalletAddress)

  return optimismPortalAbiIface.encodeFunctionData("depositTransaction", [
    to,
    value,
    gasLimit,
    isCreation,
    optimismPortalData,
  ])
}

export default getDepositTransactionData
