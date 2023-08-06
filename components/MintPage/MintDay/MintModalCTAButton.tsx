import { FC } from "react"
import { useRouter } from "next/router"
import { Button } from "../../../shared/Button"

interface MintModalCTAButtonProps {
  id: string
  link: string
  label: string
  className?: string
  target?: string
}

const MintModalCTAButton: FC<MintModalCTAButtonProps> = ({
  id,
  link,
  label,
  className,
  target,
}) => {
  const router = useRouter()

  const goToLink = () => {
    if (!target) {
      router.push(link)
      return
    }

    window.open(link, target)
  }

  return (
    <Button
      id={id}
      className={`!px-0 !py-0
              xl:!w-[260.3px] xl:!h-[50px] 
              !w-[220px] !h-[40px]
              !font-eigerdals font-bold !bg-black 
              text-[15px] xl:text-[20px]  
              !rounded-[10px]
              !text-black dark:!text-white
              dark:!bg-black !bg-white ${className || ""}`}
      onClick={goToLink}
    >
      {label}
    </Button>
  )
}

export default MintModalCTAButton
