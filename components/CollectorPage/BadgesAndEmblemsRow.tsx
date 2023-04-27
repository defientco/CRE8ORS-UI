import React from "react"
import SkeletonSection from "../SkeletonSection/SkeletonSection"

const BadgesAndEmblemsRow = () => (
  <div className="flex w-full my-4 gap-4">
    <SkeletonSection title="Badges" />
    <SkeletonSection title="Emblems" />
  </div>
)

export default BadgesAndEmblemsRow
