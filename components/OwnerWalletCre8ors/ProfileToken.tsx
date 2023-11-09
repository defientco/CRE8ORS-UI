import { FC } from "react"
import Media from "../../shared/Media"
import { useV3Provider } from "../../providers/V3Provider"

interface ProfileTokenProps {
  token: any
  inSmartWallet?: boolean
}
const ProfileToken: FC<ProfileTokenProps> = ({ token, inSmartWallet }) => {
  const { setCre8or } = useV3Provider()

  const handleClickPFP = async () => {
    setCre8or(token)
  }

  return (
    <div
      className={`flex justify-center items-center
      z-[10] ${inSmartWallet ? "opacity-[0.8]" : ""}`}
    >
      <button
        type="button"
        onClick={handleClickPFP}
        className="rounded-[5px] lg:rounded-[15px] overflow-hidden"
      >
        {token.image ? (
          <Media
            type="image"
            blurLink={token.image}
            link={token.image}
            alt={token.label}
            containerClasses="w-[30px] h-[30px] 
            samsungS8:w-[35px] samsungS8:h-[35px] 
            lg:w-[85px] lg:h-[85px] 
            bg-white overflow-hidden
            drop-shadow-[0_4px_4px_rgba(0,0,0,0.45)]"
          />
        ) : (
          <div
            className="w-[30px] h-[30px] 
            samsungS8:w-[35px] samsungS8:h-[35px] 
            lg:w-[85px] lg:h-[85px] 
            bg-white 
            rounded-[5px] lg:rounded-[15px]
            overflow-hidden"
          />
        )}
      </button>
    </div>
  )
}

export default ProfileToken
