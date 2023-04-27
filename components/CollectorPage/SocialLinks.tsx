import truncateEthAddress from "../../lib/truncateEthAddress"

const SocialLinks = ({ address, handle, location }) => (
  <div className="w-1/3 flex flex-col items-center justify-start space-y-2">
    <a
      href={`https://etherscan.io/address/${address}`}
      target="_blank"
      rel="noreferrer"
      className="w-36 text-sm border border-white bg-transparent text-white px-3 py-1 rounded"
    >
      {truncateEthAddress(address)}
    </a>
    {handle && (
      <a
        href={`https://twitter.com/${handle}`}
        target="_blank"
        rel="noreferrer"
        className="w-36 text-sm border border-white bg-transparent text-white px-3 py-1 rounded"
      >
        @{handle}
      </a>
    )}
    <div className="w-36 text-sm border border-white bg-transparent text-white px-3 py-1 rounded flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 2a6 6 0 00-6 6c0 5.657 6 12 6 12s6-6.343 6-12a6 6 0 00-6-6zm0 9a3 3 0 110-6 3 3 0 010 6z"
          clipRule="evenodd"
        />
      </svg>
      {location || "onchain"}
    </div>
  </div>
)

export default SocialLinks
