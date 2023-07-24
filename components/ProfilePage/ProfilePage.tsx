import Layout from "../Layout"
import ProfileView from "./ProfileView"

const ProfilePage = () => {
    return (
        <Layout type="contained">
            <div className="relative pt-[8rem]
            w-full ">
                <ProfileView />
            </div>
        </Layout>
    )
}

export default ProfilePage