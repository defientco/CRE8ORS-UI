import { Button } from "../../shared/Button"
import Checkbox from "../../shared/Checkbox"

const BuyCre8orButton = ({ hasCre8or }) => (
  <div className="flex gap-x-[15px] w-[280px]">
    <Button
      id="buy_cre8or"
      onClick={() => window.open("/mint", "_blank")}
      className="!p-0
                        w-[240px] h-[46px]"
    >
      Buy Cre8or
    </Button>
    <Checkbox id="owned_cre8or" checked={hasCre8or} readOnly />
  </div>
)

export default BuyCre8orButton
