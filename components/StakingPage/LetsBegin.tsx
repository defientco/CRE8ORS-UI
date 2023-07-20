import { useState } from "react"
import Checkbox from "../../shared/Checkbox"
import Content from "../Common/Content"
import Title from "../Common/Title"
import { Button } from "../../shared/Button"

const LetsBegin = () => {
  const [isSelectedAll, setIsSelectedAll] = useState(true)

  return (
    <div
      className="max-w-[1280px] flex-grow flex flex-col justify-end md:flex-row items-center 
            pb-[180px] samsungS8:pb-[220px] xs:pb-[290px] md:pb-0 relative z-[100]"
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="flex justify-center items-center">
          <div className="dark:bg-black rounded-[20px] pt-[40px] pb-[20px] md:py-[40px] md:px-20">
            <Title
              text={`WHO'S TRAINING?`}
              className="leading-[102.3%]
                      !text-[51px]
                      text-center md:text-left fade_in_text"
            />
            <Content
              content="(Select Cre8ors to soft stake)"
              className="text-center
                        leading-[103.3%]
                        !text-[26px] font-bold"
            />
            <div className="flex justify-center pt-[10px]">
                <Checkbox
                id="select_all_staking"
                checked={isSelectedAll}
                onChange={() => setIsSelectedAll(!isSelectedAll)}
                label="SELECT ALL"
                />
            </div>
            <div className="flex justify-center">
                <Button
                    id="lets_begin_staking"
                    className="!font-eigerdals !font-bold
                    !px-0 !py-0
                    w-[166px] h-[55px]
                    !text-[19px]"
                >
                    Let's begin
                </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LetsBegin
