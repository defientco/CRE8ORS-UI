import MintPage from "../../components/MintPage"
import SeoHead from "../../components/SeoHead"
import { MintProvider } from "../../providers/MintProvider"

const Mint = () => (
  <MintProvider>
    <SeoHead
      title="Cre8ors"
      description="Minting Now."
      image="https://nftstorage.link/ipfs/bafybeigzsxieetgynpr3l4lsmtukjs25e3tijrnalojivblf2qumlrlp5a"
    />
    <MintPage type="mint" />
  </MintProvider>
)

export default Mint
