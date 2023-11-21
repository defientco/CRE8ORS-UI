import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"

import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { base, baseGoerli, goerli, mainnet, optimism, optimismGoerli } from "@wagmi/core/chains"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { ChatProvider } from "../providers/ChatProvider"
import { ThemeProvider } from "../providers/ThemeProvider"
import { AdminProvider } from "../providers/AdminProvider"
import { UserProvider } from "../providers/UserProvider"

const myChains = [
  process.env.NEXT_PUBLIC_TESTNET ? goerli : mainnet,
  process.env.NEXT_PUBLIC_TESTNET ? baseGoerli : base,
  process.env.NEXT_PUBLIC_TESTNET ? optimismGoerli : optimism,
]
const { chains, publicClient, webSocketPublicClient } = configureChains(myChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const { wallets } = getDefaultWallets({
  appName: "CRE8ORS",
  projectId: "68c5ce6a0bf63be0182de421f19951b8",
  chains,
})

const connectors = connectorsForWallets(wallets)
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ThemeProvider>
          <UserProvider>
            <SessionProvider>
              <AdminProvider>
                <ChatProvider>
                  <Component {...pageProps} />
                  <ToastContainer />
                  <Analytics />
                </ChatProvider>
              </AdminProvider>
            </SessionProvider>
          </UserProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
