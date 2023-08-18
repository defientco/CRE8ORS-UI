import MintPage from "../../components/MintPage"
import { MintProvider } from "../../providers/MintProvider"

const Mint = () => (
  <MintProvider>
    <MintPage />
  </MintProvider>
)

export default Mint
