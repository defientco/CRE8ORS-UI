import { useState } from "react"
import { Button } from "../../shared/Button"
import Input from "../../shared/Input"

const VerifyTweetInput = ({ isVerified, onVerify }: any) => {
  const [value, setValue] = useState("")

  return (
    <div className=" mt-2 md:mt-0 mb-6 md:mx-12 flex justify-center md:justify-start">
      <div className="w-[290px] xs:w-[350px] md:w-[416px]">
        <Input
          id="newsletter_input"
          endAdornment={
            <Button
              id="subscribe_btn"
              className={`rounded-tl-[0px] rounded-bl-[0px] 
                    !px-[15px] 
                    capitalize text-[14px]
                    border-[none]
                    ${isVerified && "!text-[#5EE884]"}`}
              onClick={onVerify}
            >
              {isVerified ? "Verified!" : "Verify"}
            </Button>
          }
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder="https://twitter.com/you/status/id"
          className="font-quicksand text-[8px] w-[150px] xs:text-[12px] xs:w-[200px] md:text-[16px] md:w-[300px]"
          containerClassName="hover:scale-[1.1] scale-[1] transition duration-[250ms]"
          hasDoubleAnimation
        />
      </div>
    </div>
  )
}

export default VerifyTweetInput
