import { Contract } from "ethers"
import { useEffect, useMemo, useState } from "react"
import cre8orsAbi from "../../lib/abi-cre8ors.json"
import getDefaultProvider from "../../lib/getDefaultProvider"

const useSaleStatus = () => {
  const [presaleActive, setPresaleActive] = useState(false)
  const [presaleStart, setPresaleStart] = useState("")
  const [publicSaleActive, setPublicSaleActive] = useState(false)
  const [publicSaleStart, setPublicSaleStart] = useState("")
  const [loading, setLoading] = useState(true)
  const cre8orsContract = useMemo(
    () =>
      new Contract(
        process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
        cre8orsAbi,
        getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
      ),
    [],
  )

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const details = await cre8orsContract.saleDetails()
      setPublicSaleActive(details.publicSaleActive)
      setPresaleActive(details.presaleActive)
      setPresaleStart(details.presaleStart)
      setPublicSaleStart(details.publicSaleStart)
      setLoading(false)
    }

    init()
  }, [cre8orsContract])

  return {
    loadingSaleStatus: loading,
    presaleStart,
    presaleActive,
    publicSaleActive,
    publicSaleStart,
  }
}

export default useSaleStatus
