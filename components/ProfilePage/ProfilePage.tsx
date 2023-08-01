import { useMediaQuery } from "usehooks-ts"
import Layout from "../Layout"
import PreDesktopProfileView from "./PreDesktopProfileView"
import PreMobileProfileView from "./PreMobileProfileView"

const ProfilePage = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  return (
    <Layout type="contained">
      <div
        className="relative pt-[8rem] px-2 samsungS8:px-4 lg:px-10
              w-full"
      >
        {isMobile ? <PreMobileProfileView /> : <PreDesktopProfileView />}
      </div>
    </Layout>
  )
}

export default ProfilePage
