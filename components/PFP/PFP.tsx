import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import retryGetEns from "../../lib/retryGetEns"
import customLoader from "../../lib/customLoader"

const DEFAULT_AVATAR = "/CRE8ORSLOGO_ICON.png"

const PFP = ({ address, width = 100, height = 100 }: any) => {
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR)

  useEffect(() => {
    const init = async () => {
      const ensRecord = await retryGetEns(address)
      if (!ensRecord?.title) return
      let uri = `https://metadata.ens.domains/mainnet/avatar/${ensRecord.title}`
      try {
        await axios.get(uri)
      } catch {
        uri = ensRecord.metadata.image
      }
      setAvatar(uri)
    }

    if (!address) return
    init()
  }, [address])

  return (
    <div
      className={`${avatar === DEFAULT_AVATAR && "bg-white"} rounded overflow-hidden inline-block`}
    >
      <Image
        src={avatar}
        alt="pfp"
        width={width}
        height={height}
        className="rounded"
        loader={customLoader}
      />
    </div>
  )
}

export default PFP
