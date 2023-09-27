import { useRouter } from "next/router"
import { Button } from "../../shared/Button"

const MintCTAButton = () => {
  const { push } = useRouter()

  return (
    <Button
      id="mint_now_cre8ors"
      className="!px-0 !py-0
                md:!w-[242px] md:!h-[48px]
                !w-[150px] !h-[35px]
                !bg-white !text-black"
      onClick={() => push("/mint")}
    >
      Mint Now
    </Button>
  )
}

export default MintCTAButton
