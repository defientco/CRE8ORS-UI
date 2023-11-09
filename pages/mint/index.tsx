import { NextPage } from "next"
import MintPage from "../../components/MintPage"
import { MintProvider } from "../../providers/MintProvider"

const Mint: NextPage = () => (
  <MintProvider>
    <MintPage />
  </MintProvider>
)

export default Mint
