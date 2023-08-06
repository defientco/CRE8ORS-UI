import { useUserProvider } from "../../../../providers/UserProvider"

const PreSimilarProfiles = () => {
  const { similarProfiles } = useUserProvider()

  return (
    <div className="flex flex-col items-center pb-[40px]">
      <div
        className="text-[22px] font-bold font-quicksand
                  leading-[99.3%] black-white
                  pt-[20px] pb-[20px]
                  text-center"
      >
        SIMILAR PROFILES
      </div>
      <div
        className={`grid ${
          similarProfiles.length >= 4 ? "grid-cols-4" : `grid-cols-${similarProfiles.length}`
        } gap-x-[10px] gap-y-[10px]`}
      >
        {similarProfiles?.map((profile) => (
          // eslint-disable-next-line react/no-array-index-key
          <a
            href={`/profile/${profile.walletAddress}`}
            target="_blank"
            // eslint-disable-next-line no-underscore-dangle
            key={profile._id}
            rel="noreferrer"
          >
            <div className="w-[39px] h-[39px] rounded-full bg-[black]" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default PreSimilarProfiles
