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
      className={`relative 
          mt-[30px] lg:m-0
          flex justify-center
          z-[1] ${className || ""}`}
    >
      <Media
        type="image"
        link={getHttpIpfsLink(metaData?.image)}
        blurLink={getHttpIpfsLink(metaData?.image)}
        containerClasses="w-[250px] h-[250px] lg:w-[500px] lg:h-[500px]"
      />
    </div>
  )
}

export default Cre8orPFP
