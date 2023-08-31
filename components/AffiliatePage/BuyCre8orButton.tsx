import { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { Button } from "../../shared/Button"
import balanceOfAddress from "../../lib/balanceOfAddress"
import Checkbox from "../../shared/Checkbox"

const BuyCre8orButton = () => {
  const [isOwnedCre8or, setIsOwnedCre8or] = useState(false)
  const { address } = useAccount()

  const checkIsOwnedCre8ors = useCallback(async () => {
    const response = await balanceOfAddress(address)
    if (parseInt(response.toString(), 10)) setIsOwnedCre8or(true)
  }, [address])

  useEffect(() => {
    checkIsOwnedCre8ors()
  }, [checkIsOwnedCre8ors])

  return (
    <div className="flex gap-x-[15px] w-[280px]">
      <Button
        id="buy_cre8or"
        onClick={() => window.open("/mint", "_blank")}
        className="!p-0
                        w-[240px] h-[46px]"
      >
        Buy Cre8or
      </Button>
      <Checkbox id="owned_cre8or" checked={isOwnedCre8or} readOnly />
    </div>
  )
}

export default BuyCre8orButton
