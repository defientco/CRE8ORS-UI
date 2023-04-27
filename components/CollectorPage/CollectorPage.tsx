import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import balanceOfParticipationRewards from "../../lib/balanceOfParticipationRewards"
import PFP from "../PFP"
import getAnniversary from "../../lib/getAnniversary"
import epochToReadableDate from "../../lib/epochToReadableDate"
import getTwitterHandle from "../../lib/getTwitterHandle"
import getEns from "../../lib/getEns"
import CollectorName from "./CollectorName"
import SocialRow from "./SocialRow"
import RelatedAndClubsRow from "./RelatedAndClubsRow"
import BadgesAndEmblemsRow from "./BadgesAndEmblemsRow"
import HighlightSection from "./HighlightSection"
import Header from "../Header"

const NUMBER_OF_TOKENS = "0"

function CollectorPage() {
  const router = useRouter()
  const { collectorId } = router.query
  const collectorIdAsString = collectorId as string
  const [balance, setBalance] = useState(NUMBER_OF_TOKENS)
  const [anniversary, setAnniversary] = useState(null as string)
  const [twitter, setTwitter] = useState(null as string)
  const [ens, setEns] = useState({} as any)

  useEffect(() => {
    const init = async () => {
      const response = await balanceOfParticipationRewards(collectorIdAsString)
      if (response.error) return
      setBalance(response.toString())
      const epoch = await getAnniversary(collectorIdAsString)
      const readable = epochToReadableDate(epoch)
      setAnniversary(readable)
      const handle = await getTwitterHandle(collectorIdAsString)
      setTwitter(handle)
      const ensRecord = await getEns(collectorIdAsString)
      setEns(ensRecord)
    }

    init()
  }, [collectorIdAsString])

  return (
    <div className="h-screen overflow-y-auto">
      <div className="mt-11 flex flex-col">
        <Header isDark />
        <div className="flex flex-col items-center justify-around gap-5 text-4xl text-white pt-10 ">
          <CollectorName ens={ens} collectorId={collectorIdAsString} />
          <PFP address={collectorIdAsString || "0x0"} />
          <SocialRow
            address={collectorIdAsString}
            handle={twitter}
            anniversary={anniversary}
            location={null}
          />
          <RelatedAndClubsRow />
          <BadgesAndEmblemsRow />
          <HighlightSection balance={balance} />
        </div>
      </div>
    </div>
  )
}

export default CollectorPage
