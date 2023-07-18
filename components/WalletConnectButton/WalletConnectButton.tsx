/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import { FC } from "react"
import customLoader from "../../lib/customLoader"

interface IWalletConnectFuncChild {
  openConnectModal: () => void
}

interface WalletConnectButtonProps {
  children?: (props: IWalletConnectFuncChild) => any | React.ReactNode
}
const WalletConnectButton: FC<WalletConnectButtonProps> = ({ children }) => (
  <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== "loading"
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus || authenticationStatus === "authenticated")

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
                <div>
                  {typeof children === "function" ? (
                    (children as any)({
                      openConnectModal,
                    })
                  ) : (
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  )}
                </div>
              )
            }
            if (chain.unsupported) {
              return (
                <button onClick={openChainModal} type="button">
                  Wrong network
                </button>
              )
            }
            return (
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={openChainModal}
                  style={{ display: "flex", alignItems: "center" }}
                  type="button"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: chain.iconBackground,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 4,
                      }}
                    >
                      {chain.iconUrl && (
                        <Image
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          width={12}
                          height={12}
                          loader={customLoader}
                        />
                      )}
                    </div>
                  )}
                  {chain.name}
                </button>
                <button onClick={openAccountModal} type="button">
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                </button>
              </div>
            )
          })()}
        </div>
      )
    }}
  </ConnectButton.Custom>
)

export default WalletConnectButton
