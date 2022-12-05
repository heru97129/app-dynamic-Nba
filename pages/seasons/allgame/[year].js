// @flow
import * as React from 'react';
import Layout from '../../../Components/layout/Layout.js';
import styles from '../../allgamestyle/allgamestyle.module.scss'

export async function getStaticPaths() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    let res = await fetch('https://api-nba-v1.p.rapidapi.com/seasons/', options)

    const data = await res.json()
    let paths = data
        .api
        .seasons
        .map((season) => {
            return {
                params: {
                    year: season
                        .toString()
                }
            }
        })

    return {paths, fallback: false}

}

export async function getStaticProps(context) {
    const id = context.params.year
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    }; 
    console.log(id)

    const res = fetch(`https://api-nba-v1.p.rapidapi.com/games/seasonYear/${id}`, options)
    const data = await(await res).json()

    return {
        props: {
            season_game: data
        }
    }
}
let game = []
const Details = ({season_game}) => {

 season_game.api.games.map(gamet=>{
       
 
        game.push(gamet)

    
 })
 game.length = 100
 console.log(game)

//  useEffect({})

    return (
        <>
        <Layout>
        <div className={styles['season_game']}>
        <div className={styles['season_game__banner']}>
            <h1>ALL GAMES</h1>
        </div>
         <div className={styles['players-season_game__grid']}>
  
         </div>
        </div>
        </Layout>
        </>
    );
}

export default Details;