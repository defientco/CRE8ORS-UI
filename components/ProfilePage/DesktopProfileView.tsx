import { useMeasure } from "react-use"
import Media from "../../shared/Media"

const DesktopProfileView = () => {
    const [containerRef, { width }] = useMeasure()

    return (
        <div className="relative w-full
        bg-[url('/assets/Profile/background.png')] bg-cover
        rounded-[10px] aspect-[1210/1090]
        overflow-hidden"
        ref={containerRef}>
            <div className="absolute z-[1] left-0 top-0 w-full h-full
            bg-gradient-to-r from-[transparent] via-[#939292bd] to-[#373737]" />
            <div className="absolute z-[2] left-0 top-0 w-full h-full
            flex flex-col
            px-10 py-6 pb-[30px]">
                <div className="w-full flex justify-between items-center">
                    <div className="">
                        <div className="font-eigerdals text-[75px]">
                            Stargirl
                        </div>
                    </div>
                    <div className="flex items-center gap-x-[10px]">
                        <div className="w-[26px] h-[26px] bg-[white] 
                        flex items-center justify-center
                        rounded-[3px] cursor-pointer">
                            <Media
                                type="image"
                                link="/assets/Profile/home.svg"
                                blurLink="/assets/Profile/home.png"
                                containerClasses="w-[17px] h-[17px]"
                            />
                        </div>
                        <div className="w-[26px] h-[26px] bg-[#6C6C6C] 
                        flex items-center justify-center
                        rounded-[3px] cursor-pointer">
                            <Media
                                type="image"
                                link="/assets/Profile/three_dot.svg"
                                blurLink="/assets/Profile/three_dot.png"
                                containerClasses="w-[17px] h-[17px]"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-between items-start">
                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center gap-x-[15px]">
                            <div className="flex items-center gap-x-[5px]">
                                <Media
                                    type="image"
                                    link="/assets/Profile/black_twitter.svg"
                                    blurLink="/assets/Profile/black_twitter.png"
                                    containerClasses="w-[23px] h-[19px]"
                                />
                                <p className="font-quicksand font-bold text-[22px] leading-[99.3%]">
                                    @mckennarhillier
                                </p>
                            </div>
                            <div className="flex items-center gap-x-[5px]">
                                <Media
                                    type="image"
                                    link="/assets/Profile/black_location.svg"
                                    blurLink="/assets/Profile/black_location.png"
                                    containerClasses="w-[26px] h-[26px]"
                                />
                                <p className="font-quicksand font-bold text-[22px] leading-[99.3%]">
                                    Denver, CO
                                </p>
                            </div>
                            <button className="w-[26px] h-[26px] bg-[#d7d7d7d6]
                            flex items-center justify-center
                            rounded-[2px] cursor-pointer"
                            type="button">
                                <Media
                                    type="image"
                                    link="/assets/Profile/edit.svg"
                                    blurLink="/assets/Profile/edit.png"
                                    containerClasses="w-[17px] h-[17px]"
                                />
                            </button>
                        </div>
                        <div className="flex gap-x-[10px] items-end flex-grow">
                            <div className="font-quicksand uppercase text-[32px]">
                                CRE8OR #2938
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopProfileView