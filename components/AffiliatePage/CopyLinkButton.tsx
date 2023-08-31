import { CopyToClipboard } from "react-copy-to-clipboard"
import { useState } from "react"
import { toast } from "react-toastify"
import { useUserProvider } from "../../providers/UserProvider"
import { Button } from "../../shared/Button"
import Checkbox from "../../shared/Checkbox"

const CopyLinkButton = ({ origin }) => {
  const { cre8orNumber } = useUserProvider()
  const [isCopiedLink, setIsCopiedLink] = useState(false)

  return (
    <div className="flex gap-x-[15px] w-[280px]">
      <CopyToClipboard text={`${origin}/mint?referral=${cre8orNumber}`}>
        <Button
          id="copy_link"
          className="!p-0
                      w-[240px] h-[46px]
                      cursor-copy"
          onClick={() => {
            toast.success("Copied to clipboard")
            setIsCopiedLink(true)
          }}
        >
          copy affiliate link
        </Button>
      </CopyToClipboard>
      <Checkbox id="copied_link" checked={isCopiedLink} readOnly />
    </div>
  )
}

export default CopyLinkButton
