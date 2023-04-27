import React from "react"
import SkeletonSection from "../SkeletonSection/SkeletonSection"

const RelatedAndClubsRow = () => (
  <div className="flex w-full gap-4">
    <SkeletonSection title="Related Profiles" />
    <SkeletonSection title="Clubs" />
  </div>
)

export default RelatedAndClubsRow
