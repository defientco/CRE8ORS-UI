import MintPage from "../../components/MintPage"
import SeoHead from "../../components/SeoHead"
import { MintProvider } from "../../providers/MintProvider"

const Mint = () => (
  <MintProvider>
    <SeoHead title="Cre8ors" description="Minting Now." image="/assets/SeoHead/v2-logo.jpg" />
    <MintPage />
  </MintProvider>
)

export default Mint
