import Layout from "../Layout"
import Cre8orsWay from "./Cre8orsWay"
import PFPs from "./PFPs"
import Archetypes from "./Archetypes"
import InHouse from "./InHouse"
import Collaborate from "./Collaborate"
import Footer from "../Footer"

const AiPEPSPage = () => (
  <Layout type="base">
    <div
      className="relative h-screen overflow-y-auto overflow-x-hidden
    no-scrollbar"
    >
      <Cre8orsWay />
      <PFPs />
      <Archetypes />
      <InHouse />
      <Collaborate />
      <Footer className="pt-0" />
    </div>
  </Layout>
)

export default AiPEPSPage
