import { useMediaQuery } from "usehooks-ts"
import Layout from "../Layout"
import DesktopProfileView from "./DesktopProfileView"
import MobileProfileView from "./MobileProfileView"

const ProfilePage = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  return (
    <Layout type="contained">
      <div
        className="relative pt-[8rem] px-2 samsungS8:px-4 lg:px-10
              w-full"
      >
        {isMobile ? <MobileProfileView /> : <DesktopProfileView />}
      </div>
    </Layout>
  )
}

export default ProfilePage
