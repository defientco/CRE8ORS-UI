import { Core } from "@walletconnect/core"
import { Web3Wallet } from "@walletconnect/web3wallet"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { buildApprovedNamespaces } from "@walletconnect/utils"
import { Button } from "../../shared/Button"

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

const OpenSeaConnectButton = () => {
  const { address } = useAccount()
  const [web3wallet, setWeb3wallet] = useState(null as any)
  console.log("SWEETS web3wallet", web3wallet)

  useEffect(() => {
    const init = async () => {
      const response = await Web3Wallet.init({
        core, // <- pass the shared `core` instance
        metadata: {
          name: "CRE8ORS",
          description: "A cult for creators.",
          url: "www.cre8ors.com",
          icons: [],
        },
      })
      setWeb3wallet(response)
    }
    if (web3wallet) return
    init()
  }, [web3wallet])

  const handleClick = async () => {
    console.log("SWEETS PAIRING...")
    web3wallet.on("session_proposal", async (sessionProposal) => {
      console.log("SWEETS session_proposal event triggered", sessionProposal)
      const { id, params } = sessionProposal

      // ------- namespaces builder util ------------ //
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            chains: ["eip155:1", "eip155:137", "eip155:11155111", "eip155:5"],
            methods: ["eth_sendTransaction", "eth_signTypedData_v4", "personal_sign"],
            events: ["accountsChanged", "chainChanged"],
            accounts: [
              `eip155:1:${address}`,
              `eip155:137:${address}`,
              `eip155:5:${address}`,
              `eip155:11155111:${address}`,
            ],
          },
        },
      })
      // ------- end namespaces builder util ------------ //

      console.log("SWEETS PROPOSAL id", id)
      console.log("SWEETS PROPOSAL approvedNamespaces", approvedNamespaces)
      console.log("SWEETS DEBUG", web3wallet)

      const session = await web3wallet.approveSession({
        id,
        namespaces: approvedNamespaces,
      })
      console.log("SWEETS SESSION", session)
    })
    console.log("SWEETS ADDED LISTENER FOR session_proposal...")

    await web3wallet.core.pairing.pair({
      uri: "wc:b2ef1f0a745ce5c4ed12adae1a0800903969819135d0e68e4fcbfc237b6d3e30@2?relay-protocol=irn&symKey=9aec23b2958e8a2ba930402b530bbd8ff306b86cfa7c264db30bb004d90c679d",
    })
  }

  return (
    <Button
      id="opensea_via_smart_wallet"
      onClick={handleClick}
      className="!w-[250px] !h-[50px]
            md:!w-[513px] md:!h-[103px]
            !p-0
            !bg-black
            !text-white !text-[12px] md:!text-[23px]"
    >
      LOG IN TO OPENSEA VIA SMART WALLET
    </Button>
  )
}

export default OpenSeaConnectButton
