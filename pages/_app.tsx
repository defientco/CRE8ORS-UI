import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import "react-toastify/dist/ReactToastify.css"

import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { ToastContainer } from "react-toastify"
import { SessionProvider } from "next-auth/react"
import * as React from "react"
import { Analytics } from "@vercel/analytics/react"
import { ChatProvider } from "../providers/ChatProvider"
import { ThemeProvider } from "../providers/ThemeProvider"
import { AdminProvider } from "../providers/AdminProvider"
import { MintProvider } from "../providers/MintProvider"

const isMainnet = !process.env.NEXT_PUBLIC_TESTNET
const myChains = [isMainnet ? mainnet : goerli, isMainnet ? polygon : polygonMumbai]
const { chains, provider, webSocketProvider } = configureChains(myChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const { connectors } = getDefaultWallets({
  appName: "CRE8ORS",
  projectId: "68c5ce6a0bf63be0182de421f19951b8",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ThemeProvider>
          <MintProvider>
            <SessionProvider>
              <AdminProvider>
                <ChatProvider>
                  <Component {...pageProps} />
                  <ToastContainer />
                  <Analytics />
                </ChatProvider>
              </AdminProvider>
            </SessionProvider>
          </MintProvider>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
