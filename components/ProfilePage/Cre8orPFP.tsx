import { FC } from "react"
import Media from "../../shared/Media"
import { useUserProvider } from "../../providers/UserProvider"
import getHttpIpfsLink from "../../lib/getHttpIpfsLink"

interface Cre8orPFPProps {
  className?: string
}
const Cre8orPFP: FC<Cre8orPFPProps> = ({ className }) => {
  const { metaData } = useUserProvider()

  return (
    <div
      className={`relative lg:absolute 
          w-full h-full flex justify-center
          pt-[30px] lg:pt-[160px]
          z-[1] ${className || ""}`}
    >
      <Media
        type="image"
        link={getHttpIpfsLink(metaData?.image)}
        blurLink={getHttpIpfsLink(metaData?.image)}
        containerClasses="w-[250px] h-[250px] lg:w-[600px] lg:h-[600px]"
      />
    </div>
  )
}

export default Cre8orPFP
