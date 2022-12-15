export type IQuestion = {
  tags: string[]
  owner: {
    account_id: number
    reputation: number
    user_id: number
    user_type: string
    accept_rate: number
    profile_image: string
    display_name: string
    link: string
  }
  is_answered: false
  view_count: number
  answer_count: number
  score: number
  last_activity_date: number
  creation_date: number
  question_id: number
  content_license: string
  link: string
  title: string
}

export type IGetQuestionsQuery = {
  page: number
  tag: string
}
