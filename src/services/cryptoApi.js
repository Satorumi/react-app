import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_CRYPTO_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_API_CRYPTO_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  readucerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (nCrytos) => createRequest(`/coins?limit=${nCrytos}`),
    }),
    getExchanges: builder.query({ 
      query: () => createRequest('/exchanges')
    }),
    getCryptoDetails: builder.query({
      query: (cryptoId) => createRequest(`coin/${cryptoId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({cryptoId, timePeriod}) => createRequest(`coin/${cryptoId}/history/${timePeriod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
