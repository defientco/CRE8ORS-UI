import { FC, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import Media from "../../../shared/Media"
import InfographicModal from "../InfographicModal"

interface MintCardProps {
  className?: string
  label: string
  mintPrice: string
  desc: string
  decreaseQuantity: (type: number) => void
  increaseQuantity: (type: number) => void
  type: number
  quantity: number
  height: number
}

const QuantityCard: FC<MintCardProps> = ({
  className,
  label,
  mintPrice,
  desc,
  increaseQuantity,
  decreaseQuantity,
  type,
  quantity,
  height,
}) => {
  const isXl = useMediaQuery("(max-width: 1150px)")
  const isIphone = useMediaQuery("(max-width: 330px)")
  const [openInfographicModal, setOpenInfographicModal] = useState(false)

  return (
    <>
      <div
        className={`relative 
                rounded-[15px]
                gap-y-[0px]
                flex flex-col justify-center ${className}`}
        style={{
          // eslint-disable-next-line no-nested-ternary
          width: isXl ? (isIphone ? `180px` : `220px`) : "336px",
          height: isXl ? `${height}px` : "350px",
        }}
      >
        <button
          className="absolute top-[10px] right-[10px] cursor-pointer"
          type="button"
          onClick={() => setOpenInfographicModal(true)}
        >
          <Media
            link="/assets/Mint/MintNow/MintCard/help.png"
            type="image"
            containerClasses="w-[20px] h-[20px]
            xl:w-[31px] xl:h-[31px]"
          />
        </button>
        <div>
          <div
            className="text-[15px] samsungS8:text-[20px] xl:text-[29px] font-bold font-quicksand
          text-center leading-[93.3%] xl:leading-[93.3%]"
          >
            {label}
          </div>
          <div
            className="text-[20px] samsungS8:text-[30px] xl:text-[59px] font-eigerdals font-bold
          text-center leading-[93.3%] xl:leading-[93.3%] 
          xl:pt-[15px] xl:pb-[20px]
          py-[3px] samsungS8:py-[5px]"
          >
            {mintPrice} ETH
          </div>
        </div>
        <div className="flex items-center gap-x-[10px] justify-center">
          <Media
            link="/assets/Mint/MintNow/MintCard/tick.png"
            type="image"
            containerClasses="xl:w-[33px] xl:h-[33px]
              w-[15px] h-[15px]"
          />
          <div
            className="font-medium font-quicksand 
            text-[13px] xl:text-[19px]"
          >
            {desc}
          </div>
        </div>
        <div className="flex justify-center pt-[3px] samsungS8:pt-[5px] xs:pt-[15px] xl:pt-[40px]">
          <div
            className="font-bold font-quicksand 
                            uppercase text-white dark:text-[black] 
                            rounded-[5px] samsungS8:rounded-[10px] 
                            bg-[black] dark:bg-[white] 
                            shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
                            flex items-center justify-center gap-[10px]
                            cursor-pointer
                            w-[102px] h-[20px] samsungS8:h-[30px] xs:h-[35px] xl:w-[170px] xl:h-[45px]"
          >
            <div className="flex gap-x-[10px] xl:gap-x-[30px] text-[13px] samsungS8:text-[18px] xl:text-[25px]">
              <button
                type="button"
                className="w-[20px] xl:w-[40px]"
                onClick={() => decreaseQuantity(type)}
              >
                -
              </button>
              <div className="w-[20px] xl:w-[30px]">{quantity}</div>
              <button
                type="button"
                className="w-[20px] xl:w-[40px]"
                onClick={() => increaseQuantity(type)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <InfographicModal
        isModalVisible={openInfographicModal}
        toggleIsVisible={() => setOpenInfographicModal(!openInfographicModal)}
      />
    </>
  )
}

export default QuantityCard
