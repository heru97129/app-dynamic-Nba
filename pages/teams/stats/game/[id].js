
import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';
import {useEffect,useState} from 'react';
import Layout from '../../../../Components/layout/Layout.js';


let id = null
const Details = () => {
    let router = useRouter()

    let [game,
        setgame] = useState()

    useEffect(() => {

        console.log(router.query.id)
        id = router.query.id
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        fetch(`https://api-nba-v1.p.rapidapi.com/games/gameId/${id}`, options)
            .then(res => res.json())
            .then(response => setgame(response))

    }, [id])
 console.log(game)

    return (
        <>
        <Layout>

        </Layout>
        </>
    );
}

export default Details;