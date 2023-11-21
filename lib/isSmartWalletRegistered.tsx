import getSmartWallet from "./getSmartWallet"
import isDeployedContract from "./isDeployedContract"

const isSmartWalletRegistered = async (tokenId) => {
  const smartWalletAddress = await getSmartWallet(tokenId)
  return isDeployedContract(smartWalletAddress)
}

export default isSmartWalletRegistered
