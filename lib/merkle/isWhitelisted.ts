import { getAddress } from "ethers/lib/utils.js"
import whitelistedUsers from "./whitelistedUsers"

const isWhitelisted = (address: string) =>
  address ? Boolean(whitelistedUsers.find((user) => user.minter === getAddress(address))) : false

export default isWhitelisted
