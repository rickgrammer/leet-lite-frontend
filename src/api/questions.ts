import api from "."
export interface Testcase {

  input: any
  output: any
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard'
}
export interface Question {
  id?: string
  title: string
  description?: string
  acceptance?: number
  difficulty: Difficulty
  testcases: Array<Testcase>
}
export interface Questions {
  [key: string]: Question
}

export async function getQuestions() {
  const url = '/questions'

  const response = await api.get<Questions>(url)
  return response
}

export async function getQuestion(id: string) {
  const url = `/questions/${id}`
  const response = await api.get<Question>(url)
  return response
}

export async function createQuestion(question: Question) {
  const url = `/questions`
  const response = await api.post<Question>(url, question)
  return response.data
}
