import api from "."
interface Submission {
  code: string
  language: string
}
export async function createSubmission(questionId: string, submission: Submission) {
  const url = `/questions/${questionId}/submission`
  const response = await api.post<Submission>(url, submission)
  return response.data
}
