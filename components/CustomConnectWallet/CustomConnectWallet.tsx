/* eslint-disable @next/next/no-img-element */

import { ConnectButton } from "@rainbow-me/rainbowkit"

const CustomConnectWallet = () => (
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
                <button
                  className="font-bold uppercase text-[17px] lg:md:text-sm font-quicksand"
                  onClick={openConnectModal}
                  type="button"
                >
                  Connect
                </button>
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
                  style={{ display: "flex", alignItems: "center", paddingLeft: 2 }}
                  type="button"
                  className="item-center"
                >
                  {chain.hasIcon && (
                    <div
                      style={{
                        background: "none",
                        width: 18,
                        height: 18,
                        borderRadius: 999,
                        overflow: "hidden",
                        marginRight: 0,
                        marginLeft: 2,
                      }}
                      className="flex item-center"
                    >
                      {chain.iconUrl && (
                        <img
                          alt={chain.name ?? "Chain icon"}
                          src={chain.iconUrl}
                          style={{ width: 18, height: 18 }}
                        />
                      )}
                    </div>
                  )}
                </button>

                <button
                  onClick={openAccountModal}
                  type="button"
                  className="font-bold uppercase text-[17px] lg:md:text-sm font-quicksand"
                >
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

export default CustomConnectWallet
