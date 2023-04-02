const ETH = "https://eth-mainnet.g.alchemy.com/"
const GOERLI = "https://eth-goerli.g.alchemy.com/"
const POLYGON = "https://polygon-mainnet.g.alchemy.com/"
const MUMBAI = "https://polygon-mumbai.g.alchemy.com/"

const getAlchemyBaseUrl = (chainId: number) => {
  switch (chainId) {
    case 1:
      return ETH
    case 5:
      return GOERLI
    case 137:
      return POLYGON
    case 80001:
      return MUMBAI
    default:
      return ETH
  }
}

export default getAlchemyBaseUrl
