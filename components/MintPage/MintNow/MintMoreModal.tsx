import { FC } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "../../../shared/Button"
import Modal from "../../../shared/Modal"
import Media from "../../../shared/Media"

interface MintMoreModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
  possibleMintCount: number
  lockedCntOfCre8or: number
  loading: boolean
  mintCre8or: () => void
}

const MintMoreModal: FC<MintMoreModalProps> = ({
  isModalVisible,
  toggleIsVisible,
  possibleMintCount,
  lockedCntOfCre8or,
  loading,
  mintCre8or,
}) => {
  const maxOfCre8or = 4

  const isXl = useMediaQuery("(max-width: 1150px)")

  return (
    <Modal isVisible={isModalVisible} onClose={toggleIsVisible} showCloseButton>
      <div
        className={`${
          possibleMintCount ? "px-8" : "px-4"
        } py-8 samsungS8:p-8 xl:py-16 xl:px-0 rounded-lg
        flex-col flex justify-center items-center
        bg-[url('/assets/Mint/MintNow/MintCoreModal/mint_more_bg.png')]
        bg-cover`}
        style={{
          width: isXl ? "100%" : "500px",
        }}
      >
        {loading ? (
          <>
            <pre
              className="font-eigerdals 
                    text-[30px] xs:text-[33px] xl:text-[55px] 
                    uppercase text-center
                    leading-[103.3%]"
            >
              Minting Now
            </pre>
            <Media
              type="image"
              link="/assets/Common/loading.svg"
              containerClasses="w-[230px] h-[200px] samsungS8:w-[260px] xs:w-[300px] md:w-[250px] md:h-[250px] z-[3]"
            />
            <div
              className="uppercase text-white dark:text-black
          font-quicksand text-[19px] font-bold"
            >
              Loading...
            </div>
          </>
        ) : (
          <>
            <pre
              className="font-eigerdals 
                text-[30px] xs:text-[33px] xl:text-[55px] 
                uppercase text-center
                leading-[70.3%]"
            >
              Congrats!
            </pre>
            <pre
              className="font-quicksand 
                text-[15px] xl:text-[25px]
                text-center 
                xl:pb-[25px]
                pb-[5px]"
            >
              Cre8or DNA Secured.
            </pre>
            <Media
              link="/assets/Mint/MintNow/MintCoreModal/mint_avatar.svg"
              blurLink="/assets/Mint/MintNow/MintCoreModal/mint_avatar.png"
              type="image"
              containerClasses="xl:w-[192.3px] xl:h-[192.3px]
          w-[125px] h-[125px]"
            />
            <pre
              className="font-quicksand 
                text-[15px] xl:text-[25px]
                text-center 
                xl:py-[25px]
                py-[15px]
                leading-[90.3%]"
            >
              {`You have ${possibleMintCount || "no"} more\nmints available`}
            </pre>
            <div className={`${possibleMintCount ? "block" : "hidden"}`}>
              <Button
                id="mint_now"
                className="!px-0 !py-0
                  xl:!w-[192.3px] xl:!h-[50px] 
                  !w-[150px] !h-[40px]
                  !font-eigerdals font-bold !bg-black 
                  text-[15px] xl:text-[20px] 
                  !rounded-[10px]
                  !text-white"
                onClick={mintCre8or}
              >
                Mint More
              </Button>
              <pre
                className="font-quicksand 
                    text-[15px] xl:text-[20px]
                    py-[10px]
                    text-center"
              >
                OR
              </pre>
            </div>
            {maxOfCre8or === lockedCntOfCre8or ? (
              <Button
                id="mint_now"
                className="!px-0 !py-0
            xl:!w-[260.3px] xl:!h-[50px] 
            !w-[220px] !h-[40px]
            !font-eigerdals font-bold !bg-black 
            text-[15px] xl:text-[20px]  
            !rounded-[10px]
            !text-white"
              >
                Set up profile
              </Button>
            ) : (
              <Button
                id="mint_now"
                className="!px-0 !py-0
            xl:!w-[260.3px] xl:!h-[50px] 
            !w-[220px] !h-[40px]
            !font-eigerdals font-bold !bg-black 
            text-[15px] xl:text-[20px]  
            !rounded-[10px]
            !text-white"
              >
                Enter warehouse
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  )
}

export default MintMoreModal
