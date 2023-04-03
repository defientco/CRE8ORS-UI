import { useState } from "react"
import Image from "next/image"
import { toast } from "react-toastify"
import { allChains, useNetwork, useSigner, useSwitchNetwork } from "wagmi"
import getIpfsLink from "../../lib/getIpfsLink"
import customLoader from "../../lib/customLoader"
import purchaseBurn1155Minter from "../../lib/purchaseBurn1155Minter"
import purchaseBurn721Minter from "../../lib/purchaseBurn721Minter"

const RewardCard = ({ tokens, requirement, onSuccess, reqToken }) => {
  const token = tokens[0]
  const name = token.title
  const imgHash = token.metadata?.image
  const isInvalid = imgHash?.includes?.("imgUri") || imgHash?.includes?.("Hello World")
  const imageUrl = isInvalid ? "" : getIpfsLink(imgHash)
  const [processing, setProcessing] = useState(false)
  const [quantity, setQuantity] = useState("1")
  const { data: signer } = useSigner()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const polygonChainId = process.env.NEXT_PUBLIC_CHAIN_ID === "5" ? 80001 : 137

  const handleClick = async () => {
    if (!signer) {
      toast.error("please connect wallet")
      return
    }
    if (chain.id !== polygonChainId) {
      await switchNetwork(polygonChainId)
      const myChain = allChains.find((blockchain) => blockchain.id === polygonChainId)
      toast.error(`Please connect to ${myChain.name} and try again`)
      return
    }
    if (requirement.type === "ERC1155") {
      await purchaseBurn1155Minter(
        token.contract.address,
        parseInt(quantity, 10),
        signer,
        onSuccess,
        setProcessing,
      )
    } else if (requirement.type === "ERC721") {
      const mapped = reqToken.map((burner) => parseInt(burner.id.tokenId, 16))
      const tokensToBurn = mapped.slice(0, requirement.number * parseInt(quantity, 10))
      await purchaseBurn721Minter(
        token.contract.address,
        parseInt(quantity, 10),
        tokensToBurn,
        signer,
        onSuccess,
        setProcessing,
      )
    }
  }

  const hasBalance = Boolean(token.balance)
  const contractBalance =
    token?.contractMetadata?.tokenType === "ERC1155" ? token.balance : tokens.length
  const tokenBalance = hasBalance ? contractBalance : 0
  return (
    <div className="max-w-sm min-w-[90vw] sm:min-w-[20vw] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5 flex flex-col text-gray-900 dark:text-white">
        <h5 className="mb-2 text-2xl font-bold tracking-tight">{name}</h5>
        <h3 className="tracking-tight"> balance: {tokenBalance}</h3>
        <span className="px-4 flex justify-center">
          <Image
            src={imageUrl || "/cre8ors.png"}
            alt=""
            layout="fixed"
            width={80}
            height={100}
            loader={customLoader}
          />
        </span>
        <h3 className="tracking-tight">
          {" "}
          Cost: {requirement.number} {requirement.name}
        </h3>
        <div className="flex justify-around pt-3">
          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-25 disabled:cursor-not-allowed"
            placeholder="quantity"
            value={quantity}
            disabled={!requirement.type}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <button
            type="button"
            className={`inline-flex items-center px-3 py-2 text-m font-medium text-center text-white bg-blue-700
           rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
            dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-25 disabled:cursor-not-allowed`}
            onClick={() => handleClick()}
            disabled={!requirement.type || processing}
          >
            Mint
          </button>
        </div>
      </div>
    </div>
  )
}
export default RewardCard
