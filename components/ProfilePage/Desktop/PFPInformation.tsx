import { useUserProvider } from "../../../providers/UserProvider"
import AttributeCard from "./AttributeCard"

const PFPInformation = () => {
  const { userInfo, metaData } = useUserProvider()

  return (
    <>
      <div
        className="font-quicksand uppercase text-[68px] [writing-mode:vertical-rl]
              text-white
              leading-[103.3%]
              rotate-[180deg]"
      >
        {userInfo?.cre8orNumber ? `CRE8OR #${userInfo?.cre8orNumber}` : ""}
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <AttributeCard
          label="environment"
          attribute={
            metaData?.attributes.filter((attr) => attr.trait_type === "Environment")[0].value
          }
        />
        <AttributeCard
          label="Type"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Type")[0].value}
        />
        <AttributeCard
          label="Skin"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Skin")[0].value}
        />
        <AttributeCard
          label="Face"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Face")[0].value}
        />
        <AttributeCard
          label="cheeks"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Cheeks")[0].value}
        />
        <AttributeCard
          label="Clothing"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Clothing")[0].value}
        />
        <AttributeCard
          label="Head"
          attribute={metaData?.attributes.filter((attr) => attr.trait_type === "Head")[0].value}
        />
      </div>
    </>
  )
}

export default PFPInformation
