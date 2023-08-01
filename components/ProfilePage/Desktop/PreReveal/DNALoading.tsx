import Media from "../../../../shared/Media"

const DNALoading = () => (
  <div
    className="absolute w-full flex justify-center
        pt-[105px]
        z-[2]"
  >
    <Media
      type="image"
      link="/assets/Profile/dna_animation.gif"
      blurLink="/assets/Profile/dna_animation.gif"
      containerClasses="w-[697px] h-[697px]"
    />
  </div>
)

export default DNALoading
