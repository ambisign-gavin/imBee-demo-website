import stackApi from 'src/redux/apis'
import { ITag } from './type'

const tagsApi = stackApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<ITag[], string>({
      query: (tag: string) => ({
        url: '/tags',
        params: {
          order: 'desc',
          pagesize: 10,
          sort: 'popular',
          site: 'stackoverflow',
          inname: tag,
        },
      }),
      transformResponse: (response: { items: ITag[] }) => {
        return response.items
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetTagsQuery } = tagsApi
