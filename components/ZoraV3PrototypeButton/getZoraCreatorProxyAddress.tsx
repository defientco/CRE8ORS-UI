import { baseGoerli, optimismGoerli } from "@wagmi/core/chains"

const OP_GOERLI = "0x3C1ebcF36Ca9DD9371c9aA99c274e4988906c6E3"
const BASE_GOERLI = "0x87cfd516c5ea86e50b950678CA970a8a28de27ac"

const getZoraCreatorProxyAddress = (chainId) => {
  switch (chainId) {
    case optimismGoerli.id:
      return OP_GOERLI
    case baseGoerli.id:
      return BASE_GOERLI
    default:
      return OP_GOERLI
  }
}

export default getZoraCreatorProxyAddress
