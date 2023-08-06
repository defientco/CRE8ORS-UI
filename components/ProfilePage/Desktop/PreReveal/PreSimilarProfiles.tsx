import { useUserProvider } from "../../../../providers/UserProvider"

const PreSimilarProfiles = () => {
  const { similarProfiles } = useUserProvider()

  return (
    <div>
      <div
        className="text-[22px] font-bold font-quicksand
                leading-[99.3%] text-black
                pt-[20px] pb-[20px]
                text-right"
      >
        SIMILAR PROFILES
      </div>
      <div
        className={`grid ${
          similarProfiles.length >= 4 ? "grid-cols-4" : `grid-cols-${similarProfiles.length}`
        } gap-x-[10px] gap-y-[10px]`}
      >
        {similarProfiles.map((profile) => (
          // eslint-disable-next-line react/no-array-index-key, no-underscore-dangle
          <div key={profile._id} className="flex justify-end">
            <a href={`/profile/${profile.walletAddress}`} target="_blank" rel="noreferrer">
              <div className="w-[39px] h-[39px] rounded-full bg-[black]" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreSimilarProfiles
