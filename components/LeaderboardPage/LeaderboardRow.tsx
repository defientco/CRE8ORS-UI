import { ethers } from "ethers"

const LeaderboardRow = ({ address, cre8orNumber, rank, twitterHandle, totalReferralFeeEarned }) => (
  <tr key={address} className="text-center bg-white hover:bg-blue-300">
    <td
      className="text-[8px] xs:text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
    >
      #{rank}
    </td>
    <td
      className="text-[8px] text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
    >
      {cre8orNumber}
    </td>
    <td
      className="text-[8px] text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2 border-r-2 border-black"
    >
      {ethers.utils.formatEther(totalReferralFeeEarned)} ETH
    </td>
    <td
      className="text-[8px] text-[11px] md:text-[16px]
        p-[5px] md:px-4 md:py-2"
    >
      {twitterHandle ? (
        <a href={`https://twitter.com/${twitterHandle}`} target="_blank" rel="noreferrer">
          {twitterHandle}
        </a>
      ) : (
        "Not Connected"
      )}
    </td>
  </tr>
)

export default LeaderboardRow
