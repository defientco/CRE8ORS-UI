import { FC } from "react"
import Link from "next/link"
import Media from "../../../shared/Media"

interface MintCardProps {
  className?: string
  label: string
  mintPrice: string
  desc: string
  decreaseQuantity: (type: number) => void
  increaseQuantity: (type: number) => void
  type: number
  quantity: number
}

const MintCard: FC<MintCardProps> = ({
  className,
  label,
  mintPrice,
  desc,
  increaseQuantity,
  decreaseQuantity,
  type,
  quantity,
}) => (
  <div
    className={`relative 
            w-[250px] h-[249px]
            xl:w-[336px] xl:h-[350px]
            rounded-[15px] 
            flex flex-col justify-center ${className}`}
  >
    <Link href="/faq" target="_self">
      <div className="absolute top-[10px] right-[10px] cursor-pointer">
        <Media
          link="/assets/Mint/MintNow/MintCard/help.png"
          type="image"
          containerClasses="w-[20px] h-[20px]
          xl:w-[31px] xl:h-[31px]"
        />
      </div>
    </Link>
    <div>
      <div
        className="text-[27px] xl:text-[29px] font-bold font-quicksand
      text-center leading-[93.3%] xl:leading-[93.3%]
      pb-[15px]"
      >
        {label}
      </div>
      <div
        className="text-[46px] xl:text-[59px] font-eigerdals font-bold
      text-center leading-[93.3%] xl:leading-[93.3%] pb-[20px]"
      >
        {mintPrice} ETH
      </div>
      <div className="flex items-center gap-x-[10px] justify-center">
        <Media
          link="/assets/Mint/MintNow/MintCard/tick.png"
          type="image"
          containerClasses="xl:w-[33px] xl:h-[33px]
          w-[25px] h-[25px]"
        />
        <div
          className="font-medium font-quicksand 
        text-[19px]"
        >
          {desc}
        </div>
      </div>
    </div>
    <div className="flex justify-center pt-[40px]">
      <div
        className="font-bold font-quicksand 
                        uppercase text-white dark:text-[black] 
                        rounded-[10px] 
                        bg-[black] dark:bg-[white] 
                        shadow-[0px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgb(255,255,255,0.25)]
                        flex items-center justify-center gap-[10px]
                        cursor-pointer
                        w-[102px] h-[35px] xl:w-[170px] xl:h-[45px]"
      >
        <div className="flex gap-x-[10px] xl:gap-x-[30px] text-[18px] xl:text-[25px]">
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
)

export default MintCard
