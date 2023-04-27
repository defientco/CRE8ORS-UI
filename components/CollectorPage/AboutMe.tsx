const AboutMe = ({ anniversary }) => (
  <div className="w-2/3 flex flex-col items-start justify-start px-4">
    <h2 className="text-2xl mb-2">About Me</h2>
    <p className="text-gray-300 flex flex-col gap-3">
      <div className="w-36 h-3 bg-gray-200 animate-pulse rounded-2xl" />
      <div className="w-36 h-3 bg-gray-200 animate-pulse rounded-2xl" />
      <div className="w-36 h-3  rounded-2xl text-xs">Joined: {anniversary}</div>
    </p>
  </div>
)

export default AboutMe
