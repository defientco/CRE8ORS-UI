import { useUserProvider } from "../../../providers/UserProvider"

const PFPInformation = () => {
  const { userInfo } = useUserProvider()

  return (
    <div
      className="font-quicksand uppercase text-[68px] [writing-mode:vertical-rl]
            text-black
            leading-[103.3%]
            rotate-[180deg]"
    >
      {userInfo?.cre8orNumber ? `CRE8OR #${userInfo?.cre8orNumber}` : ""}
    </div>
  )
}

export default PFPInformation
