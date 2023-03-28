import { useEffect, useState } from "react"
import { BigNumber } from "ethers"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import ImageCard from "./ImageCard"
import balanceOfParticipationRewards from "../../lib/balanceOfParticipationRewards"
import truncateEthAddress from "../../lib/truncateEthAddress"
import PFP from "../PFP"
import getAnniversary from "../../lib/getAnniversary"
import epochToReadableDate from "../../lib/epochToReadableDate"
import getTwitterHandle from "../../lib/getTwitterHandle"
import getEns from "../../lib/getEns"

const NUMBER_OF_TOKENS = "0"

function CollectorPage() {
  const router = useRouter()
  const { collectorId } = router.query
  const [balance, setBalance] = useState(NUMBER_OF_TOKENS)
  const [anniversary, setAnniversary] = useState(null as string)
  const [twitter, setTwitter] = useState(null as string)
  const [ens, setEns] = useState({} as any)

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(collectorId as string)
    toast.success("copied to clipboard!")
  }

  useEffect(() => {
    const init = async () => {
      const response = await balanceOfParticipationRewards(collectorId as string)
      if (response.error) return
      setBalance(response.toString())
      const epoch = await getAnniversary(collectorId as string)
      const readable = epochToReadableDate(epoch)
      setAnniversary(readable)
      const handle = await getTwitterHandle(collectorId as string)
      setTwitter(handle)
      const ensRecord = await getEns(collectorId as string)
      setEns(ensRecord)
    }

    init()
  }, [collectorId])

  return (
    <div className="mt-3 flex flex-col">
      <div className="flex flex-col items-center justify-around text-4xl text-white pt-10 h-[75vh]">
        <div className="flex items-center gap-11">
          <PFP address={(collectorId as string) || "0x0"} />
          <div>
            <div>CRE8OR Profile</div>
            <button onClick={handleCopyClick} type="button">
              {ens?.title || truncateEthAddress(collectorId as string)}
            </button>
            {anniversary && <div className="text-sm">Joined {anniversary}</div>}
            {twitter && <div className="text-sm">Twitter: {twitter}</div>}
          </div>
        </div>
        {BigNumber.from(balance).gt(0) && (
          <div className="flex flex-col items-center gap-5">
            <ImageCard
              imageUrl="https://nftstorage.link/ipfs/bafybeiaoglcj47pklfmwnxp6sd352y4fndr3ojopof7f3ciiaogshcz3au"
              title={`Participation Rewards: ${balance.toString()}`}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CollectorPage
