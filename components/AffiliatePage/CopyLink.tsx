import { CopyToClipboard } from "react-copy-to-clipboard"
import { useUserProvider } from "../../providers/UserProvider"

const CopyLink = ({ origin }) => {
  const { cre8orNumber } = useUserProvider()

  return (
    <CopyToClipboard text={`${origin}/mint?referral=${cre8orNumber}`}>
      <p
        className="text-white text-[18px]
              font-quicksand font-medium
              cursor-copy"
      >
        {`${origin}/mint?referral=${cre8orNumber}`}
      </p>
    </CopyToClipboard>
  )
}

export default CopyLink
