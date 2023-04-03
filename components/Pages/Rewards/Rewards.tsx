import { useAccount, useNetwork, useSigner } from "wagmi"
import { useCallback, useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import getNFTs from "../../../lib/alchemy/getNFTs"
import RewardCard from "../../RewardCard"
import TOKENS from "./tokens"
import TokenSection from "./TokenSection"

const RewardsPage = () => {
  const { data: signer } = useSigner()

  return (
    <div className="flex flex-col pt-[100px] min-h-screen items-center justify-around pb-10">
      <ConnectButton />
      <h1 className="text-gray-900 dark:text-white text-4xl font-bold">Builder Rewards</h1>
      <h1 className="text-gray-900 dark:text-white text-xl font-bold text-center">
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
      {signer && <TokenSection />}
    </div>
  )
}

export default RewardsPage
