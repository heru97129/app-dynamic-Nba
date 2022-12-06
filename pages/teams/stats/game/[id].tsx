
import { useRouter } from 'next/router';
import * as React from 'react';
import { ImgHTMLAttributes, useEffect, useState } from 'react';
import Layout from '../../../../Components/layout/Layout.js';
import styles from '../../../gamestyle/gamestyle.module.scss'

type DataGame ={
    city : String,
    arena : String
    endTimeUTC : String
    hTeam:{
        fullName:String
        shortName:String
        logo : string

        score:{
            points:String
        }
    }
    vTeam:{
        fullName:String
        shortName:String
        logo : string

        score:{
            points:String
        }
    }
    
}

type Game = {
     api :{
        games:[DataGame]
     }
}





let id : unknown = null
const Details = () => {
    let router = useRouter()

    let [game,
        setgame] = useState<Game>()

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
                <div className={styles['container-game']}>
                    <div className={styles['container-game__card']}>

                        {game && game.api.games.map(game => (
                            <>
                                <div className={styles['container-game__location']}>
                                     <h2>{game.city}</h2>
                                     <h2>{game.arena}</h2>
                                     <h2>{game.endTimeUTC.substring(0,10)}</h2>
                                </div>
                                <div className={styles['container-game__status']}>
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
                            </>
                        ))}

                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Details;