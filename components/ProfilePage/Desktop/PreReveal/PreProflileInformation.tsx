import { FC } from "react"
import { useUserProvider } from "../../../../providers/UserProvider"
import { ProfileInformationProps } from "../../interface"

const PreProfileInformation: FC<ProfileInformationProps> = ({
  editedBio,
  handleEditedBio,
  editedAskedMeAbout,
  handleEditedAskedMeAbout,
  editedINeedHelpWith,
  handleINeedHelpWith,
  isEditable,
}) => {
  const { userInfo } = useUserProvider()

  return (
    <div className="flex flex-col text-black items-center lg:items-end pt-[50px]">
      <div
        className="text-[22px] font-bold font-quicksand
                  leading-[99.3%]
                  lg:text-right"
      >
        BIO
      </div>
      {isEditable ? (
        <textarea
          className="relative z-[105]
         mt-[15px] 
         text-center md:text-right 
         text-[16px] leading-[99.3%] 
         font-quicksand font-medium
         w-[220px] h-[80px] md:h-[112px]
         ring-0 outline-none
         border-[lightgray] border-[1px]
         bg-[#D9D9D9]
         px-[10px] py-[5px]
         rounded-[4px]"
          value={editedBio}
          onChange={handleEditedBio}
        />
      ) : (
        <pre
          className="text-[16px] font-quicksand font-medium
                  pt-[15px]
                  leading-[99.3%]
                  lg:text-right"
        >
          {userInfo?.bio ||
            `Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit,\nsed do eiusmod tempor\nincididunt ut labore et dolore\nmagna aliqua. Ut enim ad\nminim veniam, quis nostrud\nexercitation.`}
        </pre>
      )}
      <div
        className="text-[16px] font-medium font-quicksand
                  pt-[40px]
                  leading-[99.3%]
                  lg:text-right"
      >
        Ask me about:
      </div>
      {isEditable ? (
        <input
          className="relative z-[105]
         mt-[15px] 
         text-center md:text-right 
         text-[16px] leading-[99.3%] 
         font-quicksand font-medium
         w-[220px] h-[36px]
         ring-0 outline-none
         border-[lightgray] border-[1px]
         bg-[#D9D9D9]
         px-[10px]
         rounded-[4px]"
          value={editedAskedMeAbout}
          onChange={handleEditedAskedMeAbout}
        />
      ) : (
        <pre
          className="text-[16px] font-quicksand font-medium
                  pt-[15px]
                  leading-[99.3%]
                  lg:text-right"
        >
          {userInfo?.askMeAbout || "____________"}
        </pre>
      )}
      <div
        className="text-[16px] font-medium font-quicksand
                  pt-[40px]
                  leading-[99.3%]
                  lg:text-right"
      >
        I need help with:
      </div>
      {isEditable ? (
        <input
          className="relative z-[105]
         mt-[15px] 
         text-center md:text-right 
         text-[16px] leading-[99.3%] 
         font-quicksand font-medium
         w-[220px] h-[36px]
         ring-0 outline-none
         border-[lightgray] border-[1px]
         bg-[#D9D9D9]
         px-[10px]
         rounded-[4px]"
          value={editedINeedHelpWith}
          onChange={handleINeedHelpWith}
        />
      ) : (
        <pre
          className="text-[16px] font-quicksand font-medium
                  pt-[15px]
                  leading-[99.3%]
                  lg:text-right"
        >
          {userInfo?.iNeedHelpWith || "_______________"}
        </pre>
      )}
    </div>
  )
}

export default PreProfileInformation
