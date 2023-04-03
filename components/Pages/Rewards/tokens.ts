const TOKENS = [
  {
    title: "Participation Rewards",
    contract: { address: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS },
    requirementContract: { address: "", name: "", number: 0 },
    requirement: "participation",
    burn: null,
  },
  {
    title: "Silver Builder Reward",
    contract: { address: "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F" },
    requirementContract: {
      address: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS,
      name: "Participation Rewards",
      number: 10,
    },
    requirement: "10 Builder Rewards",
    burn: "ERC1155",
  },
  {
    title: "Gold Builder Reward",
    contract: { address: "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e" },
    requirementContract: {
      address: "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F",
      name: "Silver Builder Rewards",
      number: 5,
    },
    requirement: "5 Silver Rewards",
    burn: "ERC721",
  },
  {
    title: "Diamond Builder Reward",
    contract: { address: "0x8B0f8D9f67863d28346820Bac2A6b7a038B4C23e" },
    requirementContract: {
      address: "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e",
      name: "Gold Builder Reward",
      number: 2,
    },
    requirement: "2 Gold Rewards",
    burn: "ERC721",
  },
]

export default TOKENS
