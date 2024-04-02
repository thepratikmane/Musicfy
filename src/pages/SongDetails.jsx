import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";

const SongDetails = () => {
    const dispatch = useDispatch();

    // this 'songid' is taken from url. 
    //Now url or routes is avaible to use form App.jsx
    // and we can access them using useParam of react-router-dom
    const { songid } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid }); // making api call to get song details, passing the song id 

    const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery({ songid });

    const handlePauseClick = () => {
        dispatch(playPause(false));
    };

    const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));

    };

    if (isFetchingSongDetails || isFetchingRelatedSongs)
        return <Loader title="Searching song details" />;


    if (error) return <Error />;

    // console.log(songid);
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={songData} />

            <div className="mb-10" >
                <h2 className="text-white text-3xl font-bold" >Lyrics:</h2>

                <div className="mt-5" >
                    {songData?.sections[1].type === 'LYRICS'
                        ? songData?.sections[1].text.map((line, i) => (
                            <p className='text-gray-400 text-base my-1'>{line}</p>
                        )) : <p className='text-gray-400 text-base my-1'>sorry, no lyrics found!</p>}
                </div>
            </div>

            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    );
};

export default SongDetails;
