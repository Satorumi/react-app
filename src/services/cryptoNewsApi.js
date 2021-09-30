import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'x-bingapis-sdk': process.env.REACT_APP_RAPID_API_SDK,
  'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_NEWS_HOST,
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });
const baseUrl = process.env.REACT_APP_API_NEWS_URL;

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;