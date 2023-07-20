import Content from "../Common/Content"
import Title from "../Common/Title"
import { Button } from "../../shared/Button"
import ProfileForm from "./ProfileForm"

const SaveProfile = () => (
  <div
    className="max-w-[1280px] flex-grow flex flex-col justify-end md:flex-row items-center 
            pb-[180px] samsungS8:pb-[220px] xs:pb-[290px] md:pb-0 relative z-[100]"
  >
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div className="flex justify-center items-center">
        <div className="dark:bg-black rounded-[20px] px-[10px] samsungS8:px-0 pt-[40px] pb-[20px] md:py-[40px] md:px-20">
          <Title
            text="ALMOST DONE!"
            className="leading-[102.3%]
                      !text-[28px] samsungS8:!text-[30px] xs:!text-[33px] md:!text-[51px]
                      text-center md:text-left fade_in_text"
          />
          <Content
            content="Let's set up your profile."
            className="text-center
                        leading-[103.3%]
                        samsungS8:!text-[18px] md:!text-[26px] !font-bold"
          />
          <ProfileForm />
          <div className="flex justify-center">
            <Button
              id="lets_begin_staking"
              className="!font-eigerdals !font-bold
                    !px-0 !py-0
                    w-[166px] h-[55px]
                    !text-[19px]"
            >
              SAVE PROFILE
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SaveProfile
