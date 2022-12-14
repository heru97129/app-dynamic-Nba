// @flow
import Link from 'next/link';
import {useRouter} from 'next/router';
import * as React from 'react';
import {useEffect} from 'react';
import styles from '../playersStyle/playerstyle.module.scss'
import Layout from '../../Components/layout/Layout.js';
import { type } from 'os';

type data = {
    collegeName : String,
    lastName : String,
    playerId:React.Key,
    firstName :String,
    dateOfBirth : String,
    heightInMeters : String,
    affiliation:String,
    startNba :String,
    weightInKilograms :String,
    leagues: {
      standard :{
        jersey:String,
        divName:String
      }
    }
}

type player = {
    players : {
        api :{
            players :  [data]
        }
    }
}
type Props ={
    teamId: String;
    team :Object
}

export async function getStaticPaths() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    let res = await fetch('https://api-nba-v1.p.rapidapi.com/teams/confName/east', options)

    const data = await res.json()
    let paths = data
        .api
        .teams
        .map((team : Props) => {
            return {
                params: {
                    id: team
                        .teamId
                        .toString()
                }
            }
        })

    return {paths, fallback: false}

}

export async function getStaticProps(context: { params: { id: any; }; }) {
    const id = context.params.id
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    console.log(id)

    const res = fetch(`https://api-nba-v1.p.rapidapi.com/players/teamId/${id}`, options)
    const data = await(await res).json()

    return {
        props: {
            players: data
        }
    }
}

const Details = ({players} : player) => {

 console.log(players)

    return (
        <>
        <Layout>
        <div className={styles['players-container']}>
        <div className={styles['players-container__banner']}>
            <h1>PLAYERS</h1>
        </div>
       <div className={styles['players-container__grid']}>
            {players
                .api
                .players
                .map((player)=> {
                    return (
                        <div className={styles['players-container__card']} key={player.playerId}>
                            <div className={styles['jersey']}>
                                {player.leagues.standard !== undefined ? player.leagues.standard.jersey : null}
                            </div>
                            <Link href={`/teams/stats/${player.playerId}`} key={player.playerId}>
                                <ul>
                                    <li>
                                        FirstName:
                                        <span>{player.firstName}
                                        </span>
                                    </li>
                                    <li>
                                        LastName:
                                        <span>{player.lastName}
                                        </span>
                                    </li>
                                    <li>
                                        CollegeName:
                                        <span>{player.collegeName}
                                        </span>
                                    </li>
                                    <li>
                                        DateOfBirth:
                                        <span>
                                            {player.dateOfBirth}
                                        </span>
                                    </li>
                                    <li>
                                        Affiliation:
                                        <span>{player.affiliation}
                                        </span>
                                    </li>
                                    <li>
                                        StartNba:
                                        <span>{player.startNba}
                                        </span>
                                    </li>
                                    <li>
                                        HeightInMeters:
                                        <span>
                                            {player.heightInMeters}
                                              meter
                                        </span>
                                    </li>
                                    <li>
                                        WeightInKilograms:
                                        <span>
                                            {player.weightInKilograms}
                                              kilos
                                        </span>
                                    </li>

                                </ul>
                            </Link>
                        </div>
                        
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