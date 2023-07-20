import { useState } from "react"
import Form from "../../shared/Form"
import { profileValidation } from "./validation"
import Input from "../../shared/Input"

const ProfileForm = () => {
  const saveProfile = ({ ...value }) => {}

  const [username, setUserName] = useState("")

  return (
    <Form
      onSubmit={async (values) => {
        saveProfile({ ...values })
      }}
      validationSchema={profileValidation}
      className="w-full flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <p className="text-base font-[400] text-[#5A6B74]">User Name</p>
        <Input
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="outline-none rounded-md h-[2.2rem] lg:h-[3rem] bg-[#F9FAFB] border-[1px] border-[#F2F4F5] italic text-body placeholder:text-[#e0dfdf]"
          placeholder="Username"
          hookToForm
        />
      </div>
    </Form>
  )
}

export default ProfileForm
