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


  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details" />;

  if (error) return <Error />;

  console.log(artistId);

  let artistTopSongs;
  if (artistData) {
    console.log(artistData);
    artistTopSongs = artistData['data'][0]['views']['top-songs']['data'];
    console.log(artistTopSongs);
  }

  
  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={artistTopSongs}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
