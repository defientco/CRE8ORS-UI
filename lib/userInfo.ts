import axios from "axios"

export const getUserInfo = async (address: string) => {
  const { data } = await axios.get(`/api/v2/get/userprofile?walletAddress=${address}`)
  return data
}
