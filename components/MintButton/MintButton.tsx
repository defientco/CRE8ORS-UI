import { ConnectButton } from "@rainbow-me/rainbowkit"
import Image from "next/image"
import { useState } from "react"
import { useSigner } from "wagmi"
import purchase from "../../lib/purchase"
import Confetti from 'react-confetti'
import useWindowSize from "../../lib/useWindowSize"

const MintButton = () => {
    const [loading, setLoading] = useState(false)
    const [isMinted, setIsMinted] = useState(false)
    const {data: signer} = useSigner()
    const { width, height } = useWindowSize();

    const handleClick = async() => {
        if (!signer) return
        setLoading(true)
        const receipt = await purchase(signer)
        if(!receipt.error) {
            setIsMinted(true)
        }
        setLoading(false)
    }

    const className = `${loading ? "bg-blue-500/50" : "bg-blue-500"} ${!loading && "hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`
    // return 
    return <ConnectButton.Custom>
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
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
                <div
                {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    },
                })}
                >
                {(() => {
                    if (!connected) {
                    return (
                        <button onClick={openConnectModal} type="button" className={className}>
                        Connect Wallet
                        </button>
                    );
                    }

                    if (chain.unsupported) {
                    return (
                        <button onClick={openChainModal} type="button" className={className}>
                        Wrong network
                        </button>
                    );
                    }

                    return (
                        <button onClick={handleClick} disabled={loading} className={className}>{loading ? <Image src="/spinner.gif" alt="spinner" width={50} height={50} /> : "Mint"}</button>
                    );
                })()}
                {isMinted && <Confetti
                    width={width}
                    height={height}
                />}
                </div>
            );
            }}
        </ConnectButton.Custom>
}

export default MintButton