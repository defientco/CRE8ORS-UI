import * as _ from "lodash"
import getParticipants from "./getParticipants"

const isAddressRegistered = async (address: string) => {
  const data = await getParticipants()
  return _.has(data, address.toLowerCase())
}

export default isAddressRegistered
