import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const shazamCoreAPi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b9377ecbb6mshcff46e4f4ab6e51p1d1303jsn4a12ff6943e3');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/track' }),
        getSongDetails: builder.query({ query: ({songid}) => `/songs/get-details?key=${songid}` }),
        getSongRelated: builder.query({ query: ({songid}) => `/songs/list-recommendations?key=${songid}` }),
        getSongsBySearch: builder.query({ query: ({searchTerm}) => `/search?=&term=${searchTerm}` }),
    })
});


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetSongsBySearchQuery,
} = shazamCoreAPi;