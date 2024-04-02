import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';





// redux provide a function which is desinged to deal with apis, it's called creatApi.
// It is part of redux toolkit!
export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', 'b9377ecbb6mshcff46e4f4ab6e51p1d1303jsn4a12ff6943e3');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => 'v1/charts/world' }),
        getSongDetails: builder.query({ query: ({ songid }) => `v1/tracks/details?track_id=${songid}` }),
        getSongRelated: builder.query({ query: ({ songid }) => `v1/tracks/related?track_id=${songid}` }),
        getArtistDetails : builder.query({query: (artistId) => `v2/artists/details?artist_id=${artistId}`})
    }),
});


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery
} = shazamCoreApi;