import { Button } from "../../shared/Button"
import { useProfileProvider } from "../../providers/ProfileContext"

const EditPanel = () => {
  const { saveProfile, expandedMore, handleEditable, loading } = useProfileProvider()

  return (
    <div
      className={`absolute w-full h-full
              left-0 top-0 z-[80]
              flex justify-center items-end ${expandedMore ? "pb-[440px]" : "pb-[50px]"}`}
    >
      <div
        className="w-[480px] h-[80px]
              rounded-[40px] bg-black
              flex items-center justify-center
              gap-x-[10px]"
      >
        <div
          className="text-white text-[22px]
                  font-quicksand font-medium"
        >
          You are in editing mode.
        </div>
        <Button
          id="save-btn"
          className="!p-0 !w-[97px] !h-[50px] !rounded-[49px] 
                  !text-[22px]
                  !font-quicksand !font-bold !uppercase"
          onClick={!loading ? saveProfile : () => {}}
        >
          Save
        </Button>
        <Button
          id="cancel-btn"
          className="!p-0 !w-[54px] !h-[54px] !rounded-full 
                  !text-[22px]
                  !font-quicksand !font-bold !uppercase"
          onClick={() => handleEditable(false)}
        >
          X
        </Button>
      </div>
    </div>
  )
}

export default EditPanel
