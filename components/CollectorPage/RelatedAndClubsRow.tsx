import React from "react"
import SkeletonSection from "../SkeletonSection/SkeletonSection"

const RelatedAndClubsRow = () => (
  <div className="flex w-full my-4 gap-4">
    <SkeletonSection title="Related Profiles" />
    <SkeletonSection title="Clubs" />
  </div>
)

export default RelatedAndClubsRow
