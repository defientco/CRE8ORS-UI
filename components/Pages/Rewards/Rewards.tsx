import { allChains, useAccount, useNetwork, useSigner } from "wagmi"
import { useCallback, useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import getNFTs from "../../../lib/alchemy/getNFTs"
import RewardCard from "../../RewardCard"

const RewardsPage = () => {
  const { address: account } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { data: signer } = useSigner()
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const chain = allChains.find((c) => c.id === Number(chainId))
  const [tokens, setTokens] = useState([])

  const load = useCallback(async () => {
    if (account) {
      const PARTICIPATION = process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS
      const SILVER = "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F"
      const GOLD = "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e"
      const DIAMOND = "0x8B0f8D9f67863d28346820Bac2A6b7a038B4C23e"
      const polygonChainId = 80001
      const alchemyTokens = await getNFTs(
        account,
        [PARTICIPATION, SILVER, GOLD, DIAMOND],
        polygonChainId,
      )
      console.log("alchemyTokens", alchemyTokens)
      setTokens(alchemyTokens.ownedNfts)
    }
  }, [account, setTokens])

  useEffect(() => {
    if (!chainId) return
    if (!signer) return
    load()
  }, [account, chainId, signer, activeChain?.id, load])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col flex-wrap items-center justify-center min-h-screen gap-2 sm:flex-row">
        <ConnectButton.Custom>
          {({ account: account1, chain: chain1, openChainModal, openConnectModal, mounted }) => {
            const ready = mounted
            const connected = ready && account1 && chain1

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        type="button"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
                      >
                        Connect Wallet
                      </button>
                    )
                  }

                  if (chain.id !== Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded"
                      >
                        Wrong network
                      </button>
                    )
                  }

                  return (
                    <div className="flex flex-col flex-wrap items-center justify-center min-h-screen gap-2 sm:flex-row">
                      {tokens.length > 0 &&
                        tokens.map((token) => <RewardCard key={token.id} token={token} />)}
                    </div>
                  )
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  )
}

export default RewardsPage
