import AboutMe from "./AboutMe"
import SocialLinks from "./SocialLinks"

const SocialRow = ({ address, handle, location, anniversary }) => (
  <div key={anniversary} className="flex w-full my-4 px-7 gap-3 space-between">
    <SocialLinks address={address} handle={handle} location={location} />
    {anniversary && <AboutMe anniversary={anniversary} />}
  </div>
)

export default SocialRow
