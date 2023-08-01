import Media from "../../shared/Media"

const DNALoading = () => (
  <div
    className="relative lg:absolute 
        w-full flex justify-center
        pt-[30px] lg:pt-[105px]
        z-[2]"
  >
    <Media
      type="image"
      link="/assets/Profile/dna_animation.gif"
      blurLink="/assets/Profile/dna_animation.gif"
      containerClasses="w-[250px] h-[250px] lg:w-[697px] lg:h-[697px]"
    />
  </div>
)

export default DNALoading
