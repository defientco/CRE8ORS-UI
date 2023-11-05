import { Interface } from "ethers/lib/utils"
import abi from "../../lib/abi-ZoraNFTCreatorProxy.json"

const getCreateEditionWithReferralData = (smartWalletAddress) => {
  const zoraFactoryIface = new Interface(abi)
  const imageCid = ""
  const name = "my smart wallet IP"
  const symbol = "MW3"
  const salesConfig = {
    publicSalePrice: 0,
    maxSalePurchasePerAddress: 100,
    publicSaleStart: 0,
    publicSaleEnd: "18446744073709551615",
    presaleStart: 0,
    presaleEnd: 0,
    presaleMerkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
  }
  const editionSize = "18446744073709551615"
  const royaltyBps = "500"
  const description = "HELLO WORLD"
  const animationUri = ""
  const imageUri = `ipfs://${imageCid}`
  const fundsRecipient = smartWalletAddress
  const defaultAdmin = smartWalletAddress
  const createReferral = smartWalletAddress
  const args = [
    name,
    symbol,
    editionSize,
    royaltyBps,
    fundsRecipient,
    defaultAdmin,
    salesConfig,
    description,
    animationUri,
    imageUri,
    createReferral,
  ]
  return zoraFactoryIface.encodeFunctionData("createEditionWithReferral", args)
}

export default getCreateEditionWithReferralData
