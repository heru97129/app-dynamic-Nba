// @flow
import * as React from 'react';
import { faker } from '@faker-js/faker';
import { useEffect,useState } from 'react';
import styles from './index.module.scss'
import Link from 'next/link';



const Index = ({posts}) => {



  return (
    <>
      <ul className={styles['company-name']}>
       {posts.api.players.map((players: string ,i:Number) =>(

        <Link href={`/country/${players.firstName}`} key={`${i}`}>
         <li>{players.firstName} {players.lastName}</li>
         </Link>
       ))}
       </ul>
    </>
  );
};


export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
    }
  };
  
 let res = await fetch('https://api-nba-v1.p.rapidapi.com/players/teamId/5', options)

    const posts =  await res.json()
  
  return {
    props: {
      posts,
    },
  }
}

export default Index