import {useRouter} from 'next/router';
import React, {useEffect, useState} from 'react'
import styles from '../../statsStyle/statsstyle.module.scss'
import Layout from '../../../Components/layout/Layout.js'
import Link from 'next/link';

type data = {
    gameId: React.Key,
    assists:String,
    min:String,
    steals:String,
    turnovers:String,
    blocks:String,
    plusMinus:String, 
    tpa:String,
    points:String, 
    tpm:String,
    tpp:String,
    defReb:String,
    fga:String,
    fgm:String,
    fgp:String,
    fta:String,
    ftm:String,
    ftp:String

 
}

// type args ={
//     stats : [data]
// }

type stats = {
    api:{
        statistics : [data]
    }
}








let id: unknown = null

function stats() {
    let router = useRouter()

    let [stats,
        setstats] = useState<stats>()

    useEffect(() => {

        console.log(router.query.stats)
        id = router.query.stats
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        fetch(`https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${id}`, options)
            .then(res => res.json())
            .then(response => setstats(response))

    }, [id])
    console.log(stats)
    return ( 
         <> 
    <Layout>
        <div className={styles['stats-container']}>
            <table className={styles['stats-container__tableau']}>
                <thead>
                    <tr>
                        <th>GameId</th>
                        <th>Point</th>
                        <th>Assist</th>
                        <th>Minutes</th>
                        <th>
                            Steals</th>
                        <th>Turnovers</th>
                        <th>Blocks</th>
                        <th>Plus Minus</th>
                        <th>tpa</th>
                        <th>tpm</th>
                        <th>tpp</th>
                        <th>defReb</th>
                        <th>fga</th>
                        <th>fgm</th>
                        <th>fgp</th>
                        <th>fta</th>
                        <th>ftm</th>
                        <th>ftp</th>
                    </tr>
                </thead>
                <tbody>
                    {stats && stats
                        .api
                        .statistics
                        .map((stats  ) => {
                            return (
                                <tr key={stats.gameId}>

                                    <td> 
                                <Link href={`/teams/stats/game/${stats.gameId}`} key={stats.gameId}>
                                 {stats.gameId}
                                 </Link>
                                      </td>
                                    <td>{stats.points}pts</td>
                                    <td>{stats.assists}</td>
                                    <td>{stats.min} min</td>
                                    <td>{stats.steals}</td>
                                    <td>{stats.turnovers}</td>
                                    <td>{stats.blocks}</td>
                                    <td>{stats.plusMinus}</td>
                                    <td>{stats.tpa}</td>
                                    <td>{stats.tpm}</td>
                                    <td>{stats.tpp}</td>
                                    <td>{stats.defReb}</td>
                                    <td>{stats.fga}</td>
                                    <td>{stats.fgm}</td>
                                    <td>{stats.fgp}</td>
                                    <td>{stats.fta}</td>
                                    <td>{stats.ftm}</td>
                                    <td>{stats.ftp}</td>

                                </tr>
                            
                            )
                        })}

                </tbody>
            </table>

        </div>
    </Layout> 
    </>
    )
}

export default stats