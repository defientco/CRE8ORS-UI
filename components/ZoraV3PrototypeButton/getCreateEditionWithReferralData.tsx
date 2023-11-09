import { Interface } from "ethers/lib/utils"
import abi from "../../lib/abi-ZoraNFTCreatorProxy.json"

const getCreateEditionWithReferralData = (smartWalletAddress) => {
  const zoraFactoryIface = new Interface(abi)
  const imageCid = "bafybeiembmaq73xwazw6otn4hcke5vkga25ppmui2gw3o2ihnnljdu3k3i"
  const name = "Beach Tunes"
  const symbol = "CRE8ORS"
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
  const description = "I made this song on a beach in brazil."
  const animationUri = "ipfs://bafybeiboiacnl4tjexzvp5jtkzr2mwagrevwt5rv4326pmb4eclcso6ham"
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
