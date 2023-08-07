import { ethers } from "ethers"
import { Multicall, ContractCallResults, ContractCallContext } from "ethereum-multicall"
import lockupAbi from "./abi-lockup.json"
import handleTxError from "./handleTxError"
import getDefaultProvider from "./getDefaultProvider"

export const getIsLocked = async (tokenId: string) => {
  const provider = getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1)
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_COLLECTION_HOLDER,
    lockupAbi,
    provider,
  )

  try {
    const isLocked = await contract.isLocked(
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      parseInt(tokenId, 10),
    )

    return isLocked
  } catch (err) {
    handleTxError(err)
    return false
  }
}

export const aggregateReads = async (tokenIds: Array<number | string>) => {
  const calls = tokenIds.map((id) => ({
    reference: "isLocked",
    methodName: "isLocked",
    methodParameters: [process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, id],
  }))

  const multicall = new Multicall({
    ethersProvider: getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    tryAggregate: true,
  })

  const contractCallContext: ContractCallContext[] = []

  if (calls.length > 0) {
    contractCallContext.push({
      reference: "isLocked",
      contractAddress: process.env.NEXT_PUBLIC_LOCK_UP,
      abi: lockupAbi,
      calls,
    })
  }
  const results: ContractCallResults = await multicall.call(contractCallContext)
  return results
}

export const getLockedAndUnlockedResults = async (tokenIds: Array<number | string>) => {
  const results = await aggregateReads(tokenIds)

  const lockedAndUnlockedResults = results?.results?.isLocked?.callsReturnContext.map((call) => ({
    tokenId: call.methodParameters[1],
    isLocked: call.returnValues[0],
  }))

  return [...lockedAndUnlockedResults]
}
