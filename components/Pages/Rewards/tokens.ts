const TOKENS = [
  {
    title: "Participation Rewards",
    address: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS,
    requirement: "participation",
  },
  {
    title: "Silver Builder Reward",
    address: "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F",
    requirement: "10 Builder Rewards",
  },
  {
    title: "Gold Builder Reward",
    address: "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e",
    requirement: "5 Silver Rewards",
  },
  {
    title: "Diamond Builder Reward",
    address: "0x8B0f8D9f67863d28346820Bac2A6b7a038B4C23e",
    requirement: "2 Gold Rewards",
  },
]

export default TOKENS
