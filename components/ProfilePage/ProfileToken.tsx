import { useDrag } from "react-dnd"
import Media from "../../shared/Media"
import { ItemTypes } from "./ItemTypes"

const ProfileToken = ({ token }) => {
  const openseaUrl = process.env.NEXT_PUBLIC_TESTNET
    ? "https://testnets.opensea.io/assets/goerli"
    : "https://opensea.io/assets/ethereum"

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CRE8OR,
    item: { token },
    end: () => {},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))

  const opacity = isDragging ? 0.4 : 1

  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={`${openseaUrl}/${token.contractAddress}/${token.tokenId}`}
      style={{
        zIndex: "10",
        borderRadius: "15px",
        opacity,
        backgroundColor: "white", // Add this line
        overflow: "hidden", // Add this line to hide overflow
      }}
      ref={drag}
    >
      {token.image ? (
        <Media
          type="image"
          blurLink={token.image}
          link={token.image}
          alt={token.label}
          containerClasses="w-[30px] h-[30px] 
          samsungS8:w-[35px] samsungS8:h-[35px] 
          lg:w-[93px] lg:h-[93px] 
          bg-white overflow-hidden
          drop-shadow-[0_4px_4px_rgba(0,0,0,0.45)]"
        />
      ) : (
        <div
          className="w-[30px] h-[30px] 
          samsungS8:w-[35px] samsungS8:h-[35px] 
          lg:w-[93px] lg:h-[93px] 
          bg-white 
          rounded-[5px] lg:rounded-[15px]
          overflow-hidden"
        />
      )}
    </a>
  )
}

export default ProfileToken
