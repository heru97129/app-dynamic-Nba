// @flow
import * as React from 'react';
import { faker } from '@faker-js/faker';
import { useEffect,useState } from 'react';
import styles from '../indexStyle/index.module.scss'
import Link from 'next/link';
import Layout from '../../Components/layout/Layout.js';
import { NULL } from 'sass';

type data = {

    city : String,
    teamId : String,
    fullName:String,
    nickname :String,
    leagues: {
      standard :{
        confName:String,
        divName:String
      }
    }
    logo:string,


}

type Team = {
  posts : {api :{
    teams:[data]
  }},

  

}

const Index = ({posts} : Team) => {

console.log(posts)

  return (
    <>
    <Layout >
      <div className={styles['container-team']}>
        <div className={styles['container-team__banner']}>
         <h1>Teams Conference Est</h1>
        </div>
       <div className={styles['container-team__company-name']}>
  
       {posts.api.teams.map((team) =>{
          if((team.city != "Home") && (team.city != 'Away') && (team.city != 'USA') && (team.city != 'World')&& (team.city != 'Team')){

      return <div className={styles['container-team__company-name__card']} key={`${team.teamId}`}>
         <ul >
       <Link href={`/teams/${team.teamId}`} key={`${team.teamId}`}>
          
         <li>{team.city} </li>
         <li><img src={team.logo} alt="logo" /></li>
         <li>fullName : {team.fullName}</li>
         <li>NickName : {team.nickname}</li>
         <li>Conference: {team.leagues.standard.confName}</li>

         <li>Division: {team.leagues.standard.divName}</li>
         </Link>
         </ul>
        </div>
        }
        }
       )}
 
    </div>
    </div>
    </Layout>
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
  
 let res = await fetch('https://api-nba-v1.p.rapidapi.com/teams/confName/east', options)

    const posts =  await res.json()
  
  return {
    props: {
      posts,
    },
  }
}

export default Index