import Image from "next/image"
import SkeletonBox from "../../SkeletonBox"
import customLoader from "../../../lib/customLoader"

const HighlightSection = ({ balance }) => (
  <div className="flex flex-col items-start justify-start p-4 mb-11 border border-gray-600 rounded-lg w-[100vw]">
    <h2 className="text-xl mb-4">Highlights</h2>
    <div className="grid grid-cols-4 gap-4 p-2">
      {balance > 1 && (
        <Image
          src="https://nftstorage.link/ipfs/bafybeiaoglcj47pklfmwnxp6sd352y4fndr3ojopof7f3ciiaogshcz3au"
          alt="Relic"
          width="25px"
          height="25px"
          className="rounded-t-lg"
          loader={customLoader}
        />
      )}
      {[1, 2, 3].map((item) => (
        <SkeletonBox key={item} />
      ))}
    </div>
  </div>
)

export default HighlightSection
