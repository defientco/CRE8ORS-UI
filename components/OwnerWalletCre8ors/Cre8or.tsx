import ProfileToken from "./ProfileToken"

const Cre8or = ({ cre8or }) => (
  <div key={cre8or.tokenId} className="flex flex-col items-center gap-y-[5px]">
    <ProfileToken token={cre8or} />
    <div
      className="text-[6px] samsungS8:text-[7px] xs:text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                          w-[30px] samsungS8:w-[40px] lg:!w-[90px] text-center
                          flex flex-col items-center gap-y-[2px]"
    >
      <div className="w-full break-words uppercase">
        CRE8ORS
        {` #${cre8or.tokenId}`}
      </div>
    </div>
  </div>
)

export default Cre8or
