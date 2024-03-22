import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';





// redux provide a function which is desinged to deal with apis, it's called creatApi.
// It is part of redux toolkit!
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b9377ecbb6mshcff46e4f4ab6e51p1d1303jsn4a12ff6943e3');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world' }),
    })
});


export const {
    useGetTopChartsQuery
} = shazamCoreApi;