import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice"; // importing actions defined in redux slice 

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch(); // dispatch is used to deploy redux actions

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true))

  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slidup rounded-lg cursor-pointer" >
      <div className="relative w-full h-56 group" >
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex  ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />

        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>

      <div className="mt-4 flex flex-col">
        <p>
          <Link>
            {song.title}
          </Link>
        </p>

        <p>
          <Link>
            {song.subtitle}
          </Link>
        </p>
      </div>

    </div>
  );
}
  ;

export default SongCard;
