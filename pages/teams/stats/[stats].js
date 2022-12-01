import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '../../statsStyle/statsstyle.module.scss'







let user = []
let id = null

function stats() {
    let router = useRouter()

    let [stats,setstats] =  useState()

 

useEffect(()=>{
 
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
   .then( response =>  setstats(response))



},[id])
console.log(stats)
  return (
    <div className={styles['stats-container']}>
      {stats && stats.api.statistics.map((stats,i)=>{
      return (
        <div className={styles['stats-container__card']}>
        <ul key={stats.gameId}>
            <li>
           GameId: {stats.gameId}
          </li>
          <li>
           Point: {stats.points}
          </li>
          <li>
           Assist: {stats.assists}
          </li>
          <li>
           Minutes: {stats.min}
          </li>
          <li>
           Steals: {stats.steals}
          </li>
          <li>
           Turnovers: {stats.turnovers}
          </li>
          <li>
           Blocks: {stats.blocks}
          </li>
        </ul>
        </div>

      )
    })}</div>
  )
}

export default stats