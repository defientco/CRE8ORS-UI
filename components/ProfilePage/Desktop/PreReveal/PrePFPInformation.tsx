import { FC } from "react"

interface PrePFPInformationProps {
  expandMore: boolean
}

const PrePFPInformation: FC<PrePFPInformationProps> = ({ expandMore }) => (
  <>
    {expandMore && (
      <div
        className="font-quicksand uppercase text-[32px] [writing-mode:vertical-lr]
            rotate-[180deg]"
      >
        CRE8OR #2938
      </div>
    )}
    {!expandMore && (
      <div
        className="font-quicksand uppercase text-[68px] [writing-mode:vertical-rl]
            text-black
            leading-[103.3%]
            rotate-[180deg]"
      >
        CRE8OR #2938
      </div>
    )}
  </>
)

export default PrePFPInformation
