import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2" >
    <h3 className='font-bold text-base text-white mr-3' >{i + 1}.</h3>
    <div className='flex-1 flex flex-row justify-between items-center' >
      <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart} alt={song?.title} />
      <div className='flex-1 flex flex-col justify-center mx-3'>

        <Link to={`/songs/${song?.key}`}>
          <p className='text-xl font-bold text-white' >{song?.title}</p>
        </Link>

        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='text-base text-gray-300 mt-1' >{song?.subtitle}</p>
        </Link>

      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);
const TopPlay = () => {
  const dispatch = useDispatch();
  // The state 'activeSong', and 'isPlaying' defined in redux store, 
  // will be used to know what's the current song that is being  played and 
  // is it even playing or not!
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);
  setTimeout(function() {
}, 5000); // 5000 milliseconds = 5 seconds


  // reduxSlice got slices(componets of app with states that need to managed) (here playerSlice), 
  //slices have reducers, and reducers have actions defined (here playPause), 
  //actions can be deployed using redux dispatch
  //these actions / functions  will be activated when play-pause button is clicked, 
  //This button has handlePauseCLick/handlePlayclick function linked to them!
  // 
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
      <div className='w-full flex flex-col' >
        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl' >Top Charts</h2>
          <Link to="/top-charts">
            <p>See more</p>
          </Link>
        </div>

        <div className='mt-4 flex flex-col gap-1' >
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song?.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className='w-full flex flex-col' >
        <div className='flex flex-row justify-between items-center' >
        </div>

        <div className='flex flex-row justify-between items-center'>
          <h2 className='text-white font-bold text-2xl' >Top Artist</h2>
          <Link to="/top-artists">
            <p>See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className='shadow-lg rounded-full animate-slideright'
            >
              <Link to={`/artists/${song?.artists[0].adamid}`} >
                <img src={song?.images.background} alt="name"
                  className="rounded-full w-full object-cover" />
              </Link>
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
