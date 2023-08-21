import Media from "../../../shared/Media"

const MintLoading = () => (
  <>
    <Media
      type="image"
      link="/assets/MintV2/minting.svg"
      blurLink="/assets/MintV2/minting.png"
      containerClasses="md:w-[400px] md:h-[300px]
      w-[280px] h-[150px]
      z-[3]"
    />
    <Media
      type="image"
      link="/assets/MintV2/loading.gif"
      blurLink="/assets/MintV2/loading.gif"
      containerClasses="md:w-[350px] md:h-[200px]
      w-[200px] h-[100px]
      z-[3]"
    />
  </>
)

export default MintLoading
