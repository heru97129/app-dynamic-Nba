// @flow
import Link from 'next/link';
import * as React from 'react';
import styles from '../playersStyle/playerstyle.module.scss'
import Layout from '../../Components/layout/Layout.js';

type data = {
    playerId : React.Key,
    firstName: String,
    lastName:String,
    collegeName :String,
    leagues: {
      standard :{
        jersey:String,

      }
    }
    affiliation:string,
    startNba:string,
    heightInMeters:string,
    dateOfBirth:string,
    weightInKilograms:String

}

type Team = {
  players : {api :{
    players:[data]
  }},

  

}

type ArrayData = {
   push(player: Object): any;
   length: number;
   map(arg0: (player: any) => JSX.Element): React.ReactNode;
   playersdata : [data]
}



export async function getStaticPaths() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };

    let res = await fetch('https://api-nba-v1.p.rapidapi.com/teams/confName/west', options)

    const data = await res.json()
    let paths = data
        .api
        .teams
        .map((team: { teamId: { toString: () => any; }; }) => {
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

const Details = ({players} : Team) => {
let playersdata : ArrayData = []
console.log(playersdata)
let [addData,setdata] = React.useState<number>(10)
function PushData(){
    players.api.players.map((player : Object)=>{
       return playersdata.push(player);
    })
    if(addData === 10){
        playersdata.length = 10

    }else{
        playersdata.length = addData
    }


    console.log(playersdata.length)

}

PushData()
React.useEffect(()=>{

    if(playersdata.length >= 95){
     console.log('no more players ')
     return
    }else{
        window.addEventListener('scroll',(e : any)=>{
       
            if ((e.currentTarget.innerHeight + e.currentTarget.pageYOffset) >= document.body.offsetHeight) {
                setdata(data => data+ 5)

                PushData()
            }
    
        }) 
    }
   
},[addData])


    return (
        <>
        <Layout>
        <div className={styles['players-container']}>
        <div className={styles['players-container__banner']}>
            <h1>PLAYERS</h1>
        </div>
       <div className={styles['players-container__grid']}>
            {playersdata
                .map((player) => {
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