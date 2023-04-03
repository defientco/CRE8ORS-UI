import { allChains, useAccount, useNetwork, useSigner } from "wagmi"
import { useCallback, useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import getNFTs from "../../../lib/alchemy/getNFTs"
import RewardCard from "../../RewardCard"
import TOKENS from "./tokens"

const RewardsPage = () => {
  const { address: account } = useAccount()
  const { chain: activeChain } = useNetwork()
  const { data: signer } = useSigner()
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID
  const chain = allChains.find((c) => c.id === Number(chainId))
  const [tokens, setTokens] = useState([])

  const load = useCallback(async () => {
    if (account) {
      const tokenAddresses = TOKENS.map((token) => token.address)
      const polygonChainId = 80001
      const alchemyTokens = await getNFTs(account, tokenAddresses, polygonChainId)
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
    <div className="flex flex-col pt-[100px] min-h-screen items-center justify-around pb-10">
      <h1 className="text-gray-900 dark:text-white text-4xl font-bold">Builder Rewards</h1>
      <h1 className="text-gray-900 dark:text-white text-xl font-bold">
        earn rewards by participating in the{" "}
        <a
          href="https://twitter.com/Cre8orsNFT"
          target="_blank"
          rel="noreferrer"
          className="text-blue-300"
        >
          CRE8ORS
        </a>{" "}
        community
      </h1>
      <div className="flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row">
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
                    <div className="flex flex-col flex-wrap items-center justify-center gap-2 sm:flex-row">
                      {tokens.length > 0 &&
                        TOKENS.map((token) => (
                          <RewardCard
                            key={token.title}
                            token={
                              tokens.filter(
                                (alchemyToken) =>
                                  alchemyToken.contract.address.toLowerCase() ===
                                  token.address.toLowerCase(),
                              )[0] || token
                            }
                            requirement={token.requirement}
                          />
                        ))}
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
