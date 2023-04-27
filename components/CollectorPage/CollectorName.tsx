import { toast } from "react-toastify"
import truncateEthAddress from "../../lib/truncateEthAddress"

const CollectorName = ({ ens, collectorId }: { ens: any; collectorId: string }) => {
  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(collectorId)
    toast.success("copied to clipboard!")
  }

  return (
    <div className="w-full flex justify-center">
      <button onClick={handleCopyClick} type="button" className="text-center">
        {ens?.title || truncateEthAddress(collectorId)}
      </button>
    </div>
  )
}

export default CollectorName
