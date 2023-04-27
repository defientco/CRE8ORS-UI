import SkeletonBox from "../SkeletonBox"

const SkeletonSection = ({ title, fullWidth }) => (
  <div
    className={`flex flex-col items-start justify-start p-4 border border-gray-600 rounded-lg ${
      fullWidth ? "w-[100vw]" : "w-1/2"
    }`}
  >
    <h2 className="text-xl mb-4">{title}</h2>
    <div className="grid grid-cols-3 gap-4 p-2">
      {[1, 2, 3].map((item) => (
        <SkeletonBox key={item} />
      ))}
    </div>
  </div>
)

export default SkeletonSection
