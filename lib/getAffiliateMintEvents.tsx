import { BigNumber, utils } from "ethers"
import { getAddress } from "ethers/lib/utils"
import { ethGetLogs } from "./alchemy/eth_getLogs"

export const getAffiliateMintEvents = async () => {
  const eventSignature = utils.id("AffiliateSale(address,uint256,uint256,uint256)")
  const topics = [eventSignature]
  const chainId = process.env.NEXT_PUBLIC_TESTNET ? 5 : 1
  const affiliateMinterAddress = process.env.NEXT_PUBLIC_AFFILIATE_MINTER
  const rawLogs = await ethGetLogs(chainId, affiliateMinterAddress, topics)
  const parsedLogs = rawLogs.map((log) => {
    const userAddress = getAddress(`0x${log.topics[1].slice(26)}`)
    const cre8orsNumber = BigNumber.from(log.topics[2]).toString()
    const referralFeePaid = BigNumber.from(log.topics[3]).toString()

    return {
      userAddress,
      cre8orsNumber,
      referralFeePaid,
    }
  })

  return parsedLogs.reverse()
}
