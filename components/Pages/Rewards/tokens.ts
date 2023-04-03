const TOKENS = [
  {
    title: "Participation Rewards",
    contract: { address: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS },
    requirementContract: {
      address: "",
      name: "participation in CRE8ORS events",
      number: null,
      type: "",
    },
    requirement: "participation",
  },
  {
    title: "Silver Builder Reward",
    contract: { address: "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F" },
    requirementContract: {
      address: process.env.NEXT_PUBLIC_PARTICIPATION_REWARDS_CONTRACT_ADDRESS,
      name: "Participation Rewards",
      number: 10,
      type: "ERC1155",
    },
    requirement: "10 Builder Rewards",
  },
  {
    title: "Gold Builder Reward",
    contract: { address: "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e" },
    requirementContract: {
      address: "0xD300D8CB6003F4F72D37B5c2452e673c02327f5F",
      name: "Silver Builder Rewards",
      number: 5,
      type: "ERC721",
    },
    requirement: "5 Silver Rewards",
  },
  {
    title: "Diamond Builder Reward",
    contract: { address: "0x8B0f8D9f67863d28346820Bac2A6b7a038B4C23e" },
    requirementContract: {
      address: "0xeF8e969374C49374d3FD7cf7f3d857CA3638c79e",
      name: "Gold Builder Reward",
      number: 2,
      type: "ERC721",
    },
    requirement: "2 Gold Rewards",
  },
]

export default TOKENS
