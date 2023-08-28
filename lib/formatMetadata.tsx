const formatMetadata = (raw, tokenId) => ({
  ...raw,
  name: `Cre8ors #${tokenId}`,
  description: "A cult for creators.",
})

export default formatMetadata
