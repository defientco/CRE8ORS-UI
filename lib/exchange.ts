import { Contract, ContractInterface, Signer } from "ethers"
import getDefaultProvider from "./getDefaultProvider"
import { logToServer } from "../utils/logFx"

export const approveClaimTicket = async (
  signer: Signer,
  abi: ContractInterface,
  claimTicketId: number | string,
) => {
  await logToServer({ claimTicketId, decimalValue: parseInt(claimTicketId.toString(), 16) })
  const contract = new Contract(process.env.NEXT_PUBLIC_CRE8ORS_CLAIM_TICKET_ADDRESS, abi, signer)
  const tx = await contract.approve(
    process.env.NEXT_PUBLIC_CRE8ORS_EXCHANGE_ADDRESS,
    parseInt(claimTicketId.toString(), 16),
  )
  await logToServer(tx)
  const res = await tx.wait()
  await logToServer(res)
  return res
}
export const getIsApproved = async (abi: ContractInterface, claimTicketId: number | string) => {
  const contract = new Contract(
    process.env.NEXT_PUBLIC_CRE8ORS_CLAIM_TICKET_ADDRESS,
    abi,
    getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
  )
  const approved = await contract.getApproved(claimTicketId)
  return approved.toLowerCase() === process.env.NEXT_PUBLIC_CRE8ORS_EXCHANGE_ADDRESS.toLowerCase()
}
export const exchangeClaimTicket = async (
  signer: Signer,
  abi: ContractInterface,
  claimTicketId: number | string,
) => {
  const contract = new Contract(process.env.NEXT_PUBLIC_CRE8ORS_EXCHANGE_ADDRESS, abi, signer)
  const tx = await contract.claimPassport(claimTicketId)
  await tx.wait()
  return tx
}
