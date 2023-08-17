import { Button } from "../../shared/Button"
import Media from "../../shared/Media"

interface MintCTAButtonProps {
  link: string
  id: string
  bgLink: string
  blurBgLink: string
}
const MintCTAButton = ({ id, bgLink, blurBgLink, link }: MintCTAButtonProps) => (
  <Button
    id={id}
    onClick={() => window.open(link, "_blank")}
    className="!p-0 !bg-[transparent] !shadow-none"
  >
    <Media
      type="image"
      link={bgLink}
      blurLink={blurBgLink}
      containerClasses="xs:w-[50px] xs:h-[50px]
            w-[35px] h-[35px]"
    />
  </Button>
)

export default MintCTAButton
