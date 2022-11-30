import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'









function stats() {
    let router = useRouter()
    let user = []
console.log(router.query.stats, user)
    let [stats,setstats] =  useState()

  async function fetching(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
    
   let res = await fetch(`https://api-nba-v1.p.rapidapi.com/statistics/players/playerId/${router.query.stats}`, options)
   let data = await (await res).json()

   Array.from({length:10}).forEach(()=>{
    user.push(data)
   })

  }
  fetching()
  useEffect(()=>{
     setstats(user)
  })

  return (
    <div>{user}</div>
  )
}

export default stats