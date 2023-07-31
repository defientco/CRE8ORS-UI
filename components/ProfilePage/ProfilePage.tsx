import Layout from "../Layout"
import DesktopProfileView from "./DesktopProfileView"

const ProfilePage = () => {
    return (
        <Layout type="contained">
            <div className="relative pt-[8rem]
            w-full ">
                <DesktopProfileView />
            </div>
        </Layout>
    )
}

export default ProfilePage