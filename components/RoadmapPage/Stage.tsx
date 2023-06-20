import { FC, useEffect, useState, useRef } from "react"
import Image from "next/image"
import useShakeEffect from "../../hooks/useShakeEffect"
import { StageData } from "./types"

interface StageProps {
  stageData: StageData
  stageNumber: number
}

const Stage: FC<StageProps> = ({ stageData, stageNumber }) => {
  const [isLocked, setIsLocked] = useState(false)
  const shakeRef = useRef()

  useShakeEffect({
    ref: shakeRef,
    isEnabled: isLocked,
  })

  useEffect(() => {
    if (new Date(stageData.date).getTime() - new Date().getTime() > 0) setIsLocked(true)
  }, [stageData])

  return (
    <div
      className="w-[1150px] !h-[280px] relative
            cursor-grab flex justify-center items-center relative"
    >
      <div
        className="bg-[1065px_257px] w-[1065px] !h-[257px] relative z-[1] rounded-[20px] [&>div]:rounded-[20px]
                hover:scale-[1.02] transition duration-[500ms] shake"
        style={{
          backgroundImage: `url('${stageData.backImg}')`,
          boxShadow: isLocked ? "0px 0px 8px 4px rgb(0, 0, 0)" : "",
        }}
        ref={shakeRef}
      >
        {isLocked && (
          <div className="absolute w-[100%] h-[100%] backdrop-blur-[10px] top-0 left-0 z-[2]  pointer-events-none" />
        )}
        <div
          className="absolute w-[100%] h-[100%] z-[1] top-0 left-0
                    bg-gradient-to-r from-[#000000ed] via-[transparent] to-[#000000ed]"
        />
        <div className="absolute w-[100%] h-[100%] z-[1] top-0 left-0 z-[3]">
          <div className="font-[eigerdals] text-[250px] leading-[261px] pl-[30px] text-white opacity-[0.3]">
            {stageNumber}
          </div>
        </div>

        <div
          className="absolute w-[100%] h-[100%] flex items-end
                    left-0 top-0 z-[4]"
          style={{
            boxShadow: isLocked ? "inset 0px 0px 18px 5px" : "",
          }}
        >
          <div className="text-white uppercase p-6 font-[quicksand] text-[28px] font-[650]">
            {stageData.label}
          </div>
        </div>
        <div
          className="absolute w-[100%] h-[100%] flex flex-col items-end justify-between
                    left-0 top-0 z-[5] p-6"
        >
          <div className="text-white uppercase font-[quicksand] text-[28px] font-[650]">
            <Image
              src={isLocked ? "/assets/Roadmap/lock.svg" : "/assets/Roadmap/unlock.svg"}
              width={isLocked ? 36 : 47.44}
              height={isLocked ? 47.25 : 46}
              alt="not found image"
            />
          </div>
          <div className="font-[quicksand] text-[28px] text-white font-[700] uppercase">
            {isLocked
              ? `${new Date(stageData.date).toLocaleString("en-US", { month: "long" })} ${new Date(
                  stageData.date,
                ).getDate()}`
              : `${new Date(stageData.date).toLocaleString("en-US", { month: "long" })}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stage
