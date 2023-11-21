import { baseGoerli, optimismGoerli } from "@wagmi/core/chains"

const OP_GOERLI = "0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383"
const BASE_GOERLI = "0xe93c8cD0D409341205A592f8c4Ac1A5fe5585cfA"

const getOptimismPortalAddress = (chainId) => {
  switch (chainId) {
    case optimismGoerli.id:
      return OP_GOERLI
    case baseGoerli.id:
      return BASE_GOERLI
    default:
      return OP_GOERLI
  }
}

export default getOptimismPortalAddress
