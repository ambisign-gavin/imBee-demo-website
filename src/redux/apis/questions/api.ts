import stackApi from 'src/redux/apis'
import { IGetQuestionsQuery, IQuestion } from './type'
import React from 'react'
import { concat } from 'ramda'

const questionsApi = stackApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<
      { items: IQuestion[]; hasMore: boolean },
      IGetQuestionsQuery
    >({
      query: ({ tag, page }: IGetQuestionsQuery) => ({
        url: '/questions',
        params: {
          page,
          pagesize: 20,
          order: 'desc',
          sort: 'activity',
          tagged: tag,
          site: 'stackoverflow',
        },
      }),
      transformResponse: (response: {
        items: IQuestion[]
        has_more: boolean
      }) => {
        return { items: response.items, hasMore: response.has_more }
      },
    }),
  }),
  overrideExisting: true,
})

export const useLazyGetInfiniteScrollQuestionsQuery = () => {
  const [dataSource, setDataSource] = React.useState<IQuestion[]>([])

  const currentPage = React.useRef(1)

  const [fetchQuestions, result, lastPromiseInfo] = useLazyGetQuestionsQuery()

  const fetchNext = React.useCallback(
    (querys: { tag: string }, reset?: boolean) => {
      if (reset) {
        setDataSource([])
        currentPage.current = 1
      } else {
        currentPage.current += 1
      }
      fetchQuestions({
        tag: querys.tag,
        page: currentPage.current,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  React.useEffect(() => {
    setDataSource((data) => concat(data, result.data?.items || []))
  }, [result.data])

  return {
    fetchNext,
    dataSource,
    ...result,
    ...lastPromiseInfo,
  }
}

export const { useLazyGetQuestionsQuery, useGetQuestionsQuery } = questionsApi
