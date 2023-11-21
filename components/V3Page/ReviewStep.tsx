import { useV3Provider } from "../../providers/V3Provider"
import Icon from "../../shared/Icon"
import Cre8or from "../OwnerWalletCre8ors/Cre8or"
import ZoraV3PrototypeButton from "../ZoraV3PrototypeButton"

const ReviewStep = () => {
  const { cre8or, setCre8or, tbaAddress } = useV3Provider()

  return (
    <div className="flex flex-col gap-5">
      <button onClick={() => setCre8or(null)} type="button">
        <Icon name="arrowLeft" raw color="white" size={20} />
      </button>

      <h1>TBA (V3): {tbaAddress}</h1>
      <ZoraV3PrototypeButton />
      <Cre8or cre8or={cre8or} />
    </div>
  )
}

export default ReviewStep
