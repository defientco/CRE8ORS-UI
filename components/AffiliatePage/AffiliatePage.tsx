import Layout from "../Layout"
import BuyCre8orButton from "./BuyCre8orButton"
import CheckSmartWalletButton from "./CheckSmartWalletButton"
import CopyLink from "./CopyLink"

const AffiliatePage = () => (
  <Layout type="contained">
    <div
      className="relative w-[100%] min-h-[100vh]
                    flex flex-col items-center justify-center
                    gap-y-[20px] md:gap-y-[20px]"
    >
      <BuyCre8orButton />
      <CheckSmartWalletButton />
      <CopyLink />
    </div>
  </Layout>
)

export default AffiliatePage
