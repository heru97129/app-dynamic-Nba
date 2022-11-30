// @flow
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect} from 'react';




let user : [] =[]
const  Details = ({posts }: any)=> {
    const router = useRouter()
 

    let [players,setplayers] = React.useState([])


    async function fetching(){

        user.length = 0
        const options = {
                    method: 'GET',
                    headers: {
                      'X-RapidAPI-Key': 'b1de66cc69msh11c5a4b83787fbcp1a0636jsn3eb920355c84',
                      'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
                    }
                  };
             
                const res = await fetch(`https://api-nba-v1.p.rapidapi.com/players/firstName/${router.query.id}`,options)
                const data = await res.json()
             data.api.players.map((el)=>{
                    user.push(el)
                })

              setplayers(user)
               
    }



    useEffect(()=>{

        fetching()
       
    },[players.lastNmae])
    return (
        <div>
           
             { 
                players.map((el,i)=>(
                    <ul key={i}>
                    <li >Name :{el.lastName} {el.firstName}</li>
                    <li>country : {el.country}</li>
                    <li>CollegeName : {el.collegeGame}</li>
                    <li>heightInMeters: {el.heightInMeters}</li>
                    <li>weightInKilograms : {el.weightInKilograms}</li>
                    </ul>

                ))
             }
        </div>
    );
}

export default Details;