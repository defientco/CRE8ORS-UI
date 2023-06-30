import axios from "axios"
import AllowlistStatusPage from "../../components/AllowlistStatusPage"

const Status = () => <AllowlistStatusPage quizResult="Engineer" />

export async function getServerSideProps(context) {
  const { responseId } = context.query
  // Now you have the responseId
  try {
    console.log("GET RESULTS", responseId)

    const response = await axios.get(
      `http://localhost:3000/api/allowlist/typeform?responseId=${responseId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ALLOWLIST_API_KEY}`,
        },
      },
    )
    console.log("SWEETS RESPONSE", response)
  } catch (err) {
    console.error(err)
  }
  return {
    props: {},
  }
}

export default Status
