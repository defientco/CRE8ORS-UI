const crypto = require("crypto")

const getDeterministicRandom = (tokenId) => {
  // Ensure the tokenId is between 1 and 8888 inclusive
  if (tokenId < 1 || tokenId > 8888) {
    throw new Error("TokenId must be between 1 and 8888 inclusive.")
  }

  // Convert tokenId to string and then hash it
  const hash = crypto.createHash("sha256").update(String(tokenId)).digest("hex")

  // Convert the hash to an integer, then take modulo 8888 and add 1 to get the result between 1 and 8888 inclusive
  const number = (parseInt(hash, 16) % 8888) + 1

  return number
}

export default getDeterministicRandom
