import { useMeasure } from "react-use"
import Media from "../../shared/Media"

const ProfileView = () => {
    const [containerRef, { width }] = useMeasure()

    return (
        <div className="relative w-full
        bg-[url('/assets/Profile/background.png')] bg-cover
        rounded-[10px]"
        ref={containerRef}
        style={{
            height: `${width / 1192 * 628}px`
        }}>
            <div className="absolute z-[1] left-0 top-0 w-full h-full
            bg-gradient-to-r from-[transparent] via-[#00000045] to-[#000000ed]" />
            <div className="absolute z-[2] left-0 top-0 w-full h-full
            flex flex-col justify-between
            px-6 pb-[30px]">
                <div className="w-full flex justify-between items-center">
                    <div className="font-eigerdals text-[75px]">
                        Stargirl
                    </div>
                    <div className="font-quicksand text-[22px] uppercase font-bold text-white">
                        CRE8ORS ID: DESIGNER
                    </div>
                </div>
                <div className="w-full flex flex-col items-end">
                    <div className="text-[22px] font-quicksand font-bold uppercase text-white">
                        Badges
                    </div>
                    <div className="flex gap-x-[10px] pt-[12px]">
                        <div className="w-[52px] h-[52px] rounded-full bg-white"/>
                        <div className="w-[52px] h-[52px] rounded-full bg-white"/>
                        <div className="w-[52px] h-[52px] rounded-full bg-white"/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-end">
                    <div className="text-[22px] font-quicksand font-bold uppercase text-white">
                        highlights
                    </div>
                    <div className="text-[#9E9E9E] text-[22px] font-quicksand font-medium">
                        This Cre8or has no highlights yet.
                    </div>
                </div>
                <div className="w-full flex flex-col items-end">
                    <div className="text-[22px] font-quicksand font-bold uppercase text-white">
                        Badges
                    </div>
                    <div className="flex gap-x-[10px] pt-[12px]">
                        <Media
                            type="image"
                            link="/assets/Profile/emblem.png"
                            containerClasses="w-[47px] h-[47px]"
                        />
                        <Media
                            type="image"
                            link="/assets/Profile/emblem.png"
                            containerClasses="w-[47px] h-[47px]"
                        />
                        <Media
                            type="image"
                            link="/assets/Profile/emblem.png"
                            containerClasses="w-[47px] h-[47px]"
                        />
                    </div>
                </div>
                <div className="flex justify-end items-end w-full">
                    <div className="flex gap-x-[10px]">
                        <div className="flex items-center">
                            <Media 
                                type="image"
                                link="/assets/Profile/twitter.png"
                                containerClasses="w-[23px] h-[23px]"
                            />
                            <div className="text-[22px] font-bold text-white font-quicksand">
                                @mckennarhillier
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-[22px] font-quicksand font-bold uppercase text-white">
                            About us
                        </div>
                        <pre className="flex gap-x-[10px] pt-[12px] text-right
                        font-quicksand text-white font-medium">
                            {`Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit,
                            sed do eiusmod tempor
                            incididunt ut labore et
                            dolore magna aliqua. Ut
                            enim ad minim veniam, quis
                            nostrud exercitation.`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileView