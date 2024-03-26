import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';







const Discover = () => {

    const dispatch = useDispatch();
    const {activeSong, isPlaying} = useSelector((state) => state.player)

    const { data, isFetching, error } = useGetTopChartsQuery(); // api call is made and audio track and it's details is fetched
    console.log(data);


    const genreTitle = 'Pop';

    if (isFetching) return <Loader title="Loading songs..." />;

    if (error) return <Error />;

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex w-full  justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                    <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle} </h2>
                </div>
                <select
                    onChange={() => { }}
                    value=""
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map((genre) => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>

                <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                    {data?.map((song, i) => (
                        <SongCard
                            key={song.key}
                            song={song}
                            i={i}
                            isPlaying = {isPlaying}
                            activeSong = {activeSong}
                            data = {data}
                        />
                    ))}
                </div>
            </div>

        </>
    );
};

export default Discover;
