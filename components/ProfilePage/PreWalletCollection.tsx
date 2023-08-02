import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import Media from "../../shared/Media"

interface WalletCollectionProps {
  handleExpandMore: (expanded: boolean) => void
  expandMore: boolean
}

const PreWalletCollection: FC<WalletCollectionProps> = ({ handleExpandMore, expandMore }) => {
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const mockData = [
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
    "CRE8OR #2 InTraining",
    "PASSPORT 88",
    "DNA 752",
  ]

  return (
    <div
      className={`${
        !expandMore
          ? `${
              isMobile ? "mobile_un_expand_more" : "un_expand_more"
            } h-[55px] lg:h-[70px] overflow-hidden`
          : `${isMobile ? "mobile_expand_more" : "expand_more"} h-[220px] lg:h-[415px]
            bg-black`
      } 
        rounded-t-[10px] lg:rounded-t-[20px]
        w-full flex justify-between items-start mt-[20px] pt-[20px]
        gap-x-[10px]
        lg:px-10 lg:pb-10
        px-2 pb-2`}
    >
      <div>
        <div className="flex items-center gap-x-[5px] samsungS8:gap-x-[10px]">
          <Media
            type="image"
            containerClasses="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"
            link={`${expandMore ? "/assets/Profile/help.svg" : "/assets/Profile/black_help.svg"}`}
            blurLink={`${
              expandMore ? "/assets/Profile/help.png" : "/assets/Profile/black_help.png"
            }`}
          />
          <p
            className={`${
              expandMore ? "text-white" : "text-black"
            } text-[9px] samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
            uppercase`}
          >
            SMART WALLET
          </p>
          <button type="button" onClick={() => handleExpandMore(!expandMore)}>
            <Media
              type="image"
              containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
              link={`${
                expandMore ? "/assets/Profile/arrow_up.svg" : "/assets/Profile/black_arrow_down.svg"
              }`}
              blurLink={`${
                expandMore ? "/assets/Profile/arrow_up.png" : "/assets/Profile/black_arrow_down.png"
              }`}
            />
          </button>
        </div>
        <div className="border-r-[2px] pr-[20px] lg:pr-[50px] border-r-[white]">
          <div
            className="mt-[35px]
                  relative
                  flex items-center justify-center
                  lg:px-4 lg:py-6 p-2
                  rounded-[8px] lg:rounded-[15px]
                  overflow-hidden
                  lg:w-[287px] lg:h-[287px]
                  samsungS8:w-[130px] samsungS8:h-[130px]
                  w-[120px] h-[120px]
                  after:content-[''] after:bg-[white] after:opacity-[0.3]
                  after:w-full after:h-full
                  after:absolute
                  after:left-0 after:top-0 after:z-[1]"
          >
            <div className="absolute w-full h-full left-0 top-0 z-[2]
            bg-[url('/assets/Profile/dna_animation.gif')] bg-cover" />
            <div
              className="grid grid-cols-3 w-full relative z-[2]
                      gap-y-[5px] lg:gap-y-[15px]"
            >
              {[...Array(9)].map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="flex justify-center" key={i}>
                  <div
                    className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[69px] lg:h-[67px] rounded-[5px] lg:rounded-[8px] bg-[#ffffffb5]
                                      drop-shadow-[0_4px_4px_rgba(0,0,0,0.45)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-end gap-x-[5px] samsungS8:gap-x-[10px]">
          <p
            className={`${
              expandMore ? "text-white" : "text-black"
            } text-[9px] samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
            uppercase`}
          >
            VIEW COLLECTION
          </p>
          <button type="button" onClick={() => handleExpandMore(!expandMore)}>
            <Media
              type="image"
              containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
              link={`${
                expandMore ? "/assets/Profile/arrow_up.svg" : "/assets/Profile/black_arrow_down.svg"
              }`}
              blurLink={`${
                expandMore ? "/assets/Profile/arrow_up.png" : "/assets/Profile/black_arrow_down.png"
              }`}
            />
          </button>
        </div>
        <div
          className="grid grid-cols-3 xs:grid-cols-4 lg:grid-cols-6 gap-x-[5px] lg:gap-x-[15px] gap-y-[5px] pt-[15px] mt-[20px]
                h-[140px] lg:h-[287px] 
                overflow-y-auto overflow-x-hidden
                pr-4"
        >
          {mockData.map((data, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="flex flex-col items-center gap-y-[5px]">
              <div className="w-[30px] h-[30px] samsungS8:w-[35px] samsungS8:h-[35px] lg:w-[93px] lg:h-[93px] bg-white rounded-[5px] lg:rounded-[15px]" />
              <div
                className="text-[8px] lg:text-[12px] font-quicksand font-bold text-white
                            w-[30px] samsungS8:w-[40px] lg:w-[67px] text-center"
              >
                {data}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PreWalletCollection
