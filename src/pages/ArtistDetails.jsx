import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";


import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {

  // this 'artistId' is taken from url. 
  //Now url or routes is avaible to use form App.jsx
  // and we can access them using useParam of react-router-dom
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };


  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details" />;

  if (error) return <Error />;

  if (artistData) {
    console.log(artistData['data'][0]['views']['top-songs']['data']);
  }



  // if (artistData) {
  //   console.log(artistData);
  // }


  // console.log(artistId);
  return (
    <div className="flex flex-col">
      {/* <DetailsHeader artistId={artistId} artistData={artistData} /> */}

      <RelatedSongs
        data={artistData['data'][0]['views']['top-songs']['data']}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
