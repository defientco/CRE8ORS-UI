import axios from "axios"

export const logToServer = async (body) => {
  axios.post("/api/log", body)
}
