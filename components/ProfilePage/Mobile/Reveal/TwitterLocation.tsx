import Media from "../../../../shared/Media"

const TwitterLocation = () => (
  <div className="flex items-center justify-center gap-x-[15px] pt-[5px]">
    <div className="flex items-center gap-x-[5px]">
      <Media
        type="image"
        link="/assets/Profile/black_twitter.svg"
        blurLink="/assets/Profile/black_twitter.png"
        containerClasses="w-[20px] h-[16px]"
      />
      <p className="font-quicksand font-bold text-[12px] leading-[99.3%]">@mckennarhillier</p>
    </div>
    <div className="flex items-center gap-x-[5px]">
      <Media
        type="image"
        link="/assets/Profile/black_location.svg"
        blurLink="/assets/Profile/black_location.png"
        containerClasses="w-[23px] h-[23px]"
      />
      <p className="font-quicksand font-bold text-[12px] leading-[99.3%]">Denver, CO</p>
    </div>
  </div>
)

export default TwitterLocation
