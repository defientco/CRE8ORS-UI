const PreSimilarProfiles = () => (
  <div className="flex flex-col items-center pb-[40px]">
    <div
      className="text-[22px] font-bold font-quicksand
                leading-[99.3%] black-white
                pt-[20px] pb-[20px]
                text-center"
    >
      SIMILAR PROFILES
    </div>
    <div className="grid grid-cols-4 gap-x-[10px] gap-y-[10px]">
      {[...Array(8)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="w-[39px] h-[39px] rounded-full bg-[black]" key={i} />
      ))}
    </div>
  </div>
)

export default PreSimilarProfiles
