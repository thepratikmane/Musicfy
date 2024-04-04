import { usestate, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
    const [country, SetCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);


    console.log(country);
    useEffect(() => {
        //at_Eky15ECsTzJOhmuuwbWrZXothG8N6
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_Eky15ECsTzJOhmuuwbWrZXothG8N6`)
        .then((res) => SetCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));

    }, [country])
    return (
        <>

        </>
    );
};

export default AroundYou;
