import axios from "axios"
import AllowlistStatusPage from "../../components/AllowlistStatusPage"

const Status = ({ quizResult }: any) => <AllowlistStatusPage quizResult={quizResult} />

export async function getServerSideProps(context) {
  const { responseId } = context.query
  try {
    const response = await axios.get(
      `http://localhost:3000/api/allowlist/typeform?responseId=${responseId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ALLOWLIST_API_KEY}`,
        },
      },
    )
    return { props: { quizResult: response.data.cre8or } }
  } catch (err) {
    return {
      props: {},
    }
  }
}

export default Status
