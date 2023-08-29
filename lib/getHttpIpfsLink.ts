const getHttpIpfsLink = (ipfsLink) => {
  if (!ipfsLink) return ""
  const gateway = "https://ipfs.io/ipfs/"
  const hash = ipfsLink.replace("ipfs://", "")
  return `${gateway}${hash}`
}

export default getHttpIpfsLink
