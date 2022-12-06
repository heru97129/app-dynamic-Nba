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
const Details = ({season_game}) => {
let game = []

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
         <div className={styles['season_game__grid']}>
            {
            game.map(game=>{
                return(
                    <>
                                <div className={styles['game-card']}>

                       <div className={styles['season_game__location']}>
                                     <h2>{game.city}</h2>
                                     <h2>{game.arena}</h2>
                                     <h2>{game.endTimeUTC.substring(0,10)}</h2>
                                </div>
                                <div className={styles['season_game__status']}>
                                    <div className={styles['loser']}>
                                        <div className={styles['team']}>
                                            <h2>
                                                {game.hTeam.fullName}
                                            </h2>
                                            <div className={styles['logo_score']}>
                                                <div>
                                                 <img src={game.hTeam.logo} />
                                                    
                                                </div>
                                            
                                            </div>
                                            <div>
                                               <h2>
                                               {game.hTeam.shortName}
                                               </h2>
                                            </div>
                                        </div>
                                        <div className={styles['score']}>
                                                    {game.hTeam.score.points}
                                    </div>
                                    </div>
                                    <div className={styles['winner']}>
                                    <div className={styles['team']}>
                                            <h2>
                                                {game.vTeam.fullName}
                                            </h2>
                                            <div className={styles['logo_score']}>
                                                <div>
                                                 <img src={game.vTeam.logo} />
                                                    
                                                </div>
                                            
                                            </div>
                                            <div>
                                               <h2>
                                               {game.vTeam.shortName}
                                               </h2>
                                            </div>
                                        </div>
                                        <div className={styles['score']}>
                                                    {game.vTeam.score.points}
                                       </div>
                                    </div>
                                </div>
                                </div>

                    </>
                )
            })
            }
         </div>
        </div>
        </Layout>
        </>
    );
}

export default Details;