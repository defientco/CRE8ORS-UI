import { BigNumber, utils } from "ethers"
import getStorageAt from "./alchemy/getStorageAt"

const ERC1967_IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"

const getImplementationAddress = async (proxyAddress) => {
  const data = await getStorageAt(proxyAddress, ERC1967_IMPLEMENTATION_SLOT)
  const NULL_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000"
  const implementation =
    data === NULL_ADDRESS ? false : utils.getAddress(BigNumber.from(data).toHexString())
  return implementation
}

export default getImplementationAddress
