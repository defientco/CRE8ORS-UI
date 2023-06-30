import QuizResultPage from "./QuizResultPage"

const AllowlistStatusPage = ({ quizResult }: any) => (
  <div>{quizResult && <QuizResultPage quizResult={quizResult} />}</div>
)

export default AllowlistStatusPage
