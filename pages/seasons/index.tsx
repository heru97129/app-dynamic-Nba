// @flow
import * as React from 'react';

import styles from '../seasonstyle/seasonstyle.module.scss'
import Layout from '../../Components/layout/Layout';
import Link from 'next/link';


type Seasons ={
  posts :{
    api :{
      seasons : []
  }
  }
  
}


const Index = ({posts} : Seasons) => {


  return (
    <>
    <Layout>
    <div className={styles['container-season']}>
      <div className={styles['container-season__banner']}>
         <h1>Seasons</h1>
        </div>
        <div className={styles['container-season__Seasons']}>
            <div className={styles['all-seas']}>
            <ul>

                {posts.api.seasons.map((season : String) =>{
                    return( 
                    <>
                    <Link href={`/seasons/allgame/${season}`} key={`${season}`}> 
                     <li >
                            {season}
                    </li> 
                    </Link>
                    </> 
                             )

                })}
            </ul>


            </div>
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
  
 let res = await fetch('https://api-nba-v1.p.rapidapi.com/seasons/', options)

    const posts =  await res.json()
  
  return {
    props: {
      posts,
    },
  }
}

export default Index