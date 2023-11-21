import { CHAIN_ID } from "../helpers/constants"
import getDefaultProvider from "./getDefaultProvider"

const isDeployedContract = async (address, chainId = CHAIN_ID) => {
  const provider = getDefaultProvider(chainId)
  const code = await provider.getCode(address)
  const hasTokenboundAccount = code !== "0x"
  return hasTokenboundAccount
}

export default isDeployedContract
