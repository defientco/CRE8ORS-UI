import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import Modal from "../../../../shared/Modal"
import Media from "../../../../shared/Media"

interface MintMoreModalProps {
  isModalVisible: boolean
}

const OnChainLoading: FC<MintMoreModalProps> = ({ isModalVisible }) => {
  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <Modal isVisible={isModalVisible} onClose={() => {}}>
      <div
        className={`px-4 py-8 samsungS8:p-8 xl:py-12 xl:px-0 rounded-lg
        flex-col flex justify-center items-center
        bg-[url('/assets/Mint/MintNow/MintCoreModal/mint_more_bg.png')]
        bg-cover bg-black dark:bg-white`}
        style={{
          width: isXl ? "100%" : "500px",
        }}
      >
        <pre
          className="font-eigerdals 
            text-[30px] xs:text-[33px] xl:text-[55px] 
            uppercase text-center
            leading-[90.3%]
            dark:text-black text-white"
        >
          {`Loading\nmint info...`}
        </pre>
        <Media
          type="image"
          link="/assets/Common/loading.svg"
          containerClasses="w-[80px] h-[80px] 
          samsungS8:w-[130px] samsungS8:h-[130px] 
          xs:w-[130px] xs:h-[130px] 
          md:w-[250px] md:h-[250px] 
          z-[3]"
        />
        <div
          className="uppercase text-white dark:text-black
              font-quicksand text-[19px] font-bold
              dark:text-black text-white"
        >
          Loading...
        </div>
      </div>
    </Modal>
  )
}

export default OnChainLoading
