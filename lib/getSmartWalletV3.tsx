import { Contract } from "ethers"
import registryAbi from "./abi-ERC6551-registry-v3.json"
import getDefaultProvider from "./getDefaultProvider"
import {
  ACCOUNT_IMPLEMENTATION_V3,
  CHAIN_ID,
  REGISTRY_ADDRESS_V3,
  SALT_V3,
} from "../helpers/constants"

const getSmartWalletV3 = async (cre8orNumber) => {
  const registryContract = new Contract(
    REGISTRY_ADDRESS_V3,
    registryAbi,
    getDefaultProvider(CHAIN_ID),
  )
  const tokenBoundAccount = await registryContract.account(
    ACCOUNT_IMPLEMENTATION_V3,
    SALT_V3,
    CHAIN_ID,
    process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
    cre8orNumber,
  )

  return tokenBoundAccount
}

export default getSmartWalletV3
