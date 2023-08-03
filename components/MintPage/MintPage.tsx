import { FC } from "react"
import Layout from "../Layout"
import Cre8orsWay from "./Sections/Cre8orsWay"
import PFPs from "./Sections/PFPs"
import Archetypes from "./Sections/Archetypes"
import InHouse from "./Sections/InHouse"
import Collaborate from "./Sections/Collaborate"
import Footer from "../Footer"
import MintBoard from "./MintDay/MintBoard"
import PreMintBoard from "./PreMint/PreMintBoard"

interface MintPageProps {
  type: "premint" | "mint"
}

const MintPage: FC<MintPageProps> = ({ type }) => (
  <Layout type="base">
    <div className="relative h-screen overflow-y-auto overflow-x-hidden">
      {type === "premint" && <PreMintBoard />}
      {type === "mint" && <MintBoard />}
      <Cre8orsWay />
      <PFPs />
      <Archetypes />
      <InHouse />
      <Collaborate />
      <Footer className="pt-0" />
    </div>
  </Layout>
)

export default MintPage
