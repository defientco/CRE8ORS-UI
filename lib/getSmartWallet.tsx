import { Contract } from "ethers"
import registryAbi from "./abi-ERC6551-registry.json"
import getDefaultProvider from "./getDefaultProvider"
import {
  ACCOUNT_IMPLEMENTATION_V2,
  CHAIN_ID,
  REGISTRY_ADDRESS_V2,
  SALT_V2,
} from "../helpers/constants"

const getSmartWallet = async (cre8orNumber) => {
  const registryContract = new Contract(
    REGISTRY_ADDRESS_V2,
    registryAbi,
    getDefaultProvider(CHAIN_ID),
  )
  const tokenBoundAccount = await registryContract.account(
    ACCOUNT_IMPLEMENTATION_V2,
    CHAIN_ID,
    process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
    cre8orNumber,
    SALT_V2,
  )

  return tokenBoundAccount
}

export default getSmartWallet
