import MintPage from "../../components/MintPage"
import { MintProvider } from "../../providers/MintProvider"

const Mint = () => (
  <MintProvider>
    <MintPage type="mint" />
  </MintProvider>
)

export default Mint
