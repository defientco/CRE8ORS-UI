import { FC } from "react"
import { Button } from "../../../shared/Button"

interface MintModalCTAButtonProps {
  id: string
  link: string
  label: string
  className?: string
}

const MintModalCTAButton: FC<MintModalCTAButtonProps> = ({ id, link, label, className }) => (
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
    onClick={() => window.open(link, "_blank")}
  >
    {label}
  </Button>
)

export default MintModalCTAButton
