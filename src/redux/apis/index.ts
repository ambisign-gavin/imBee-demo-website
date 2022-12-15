import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const stackApi = createApi({
  reducerPath: 'stackApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.stackexchange.com/2.3/' }),
  endpoints: () => ({}),
})

export default stackApi
