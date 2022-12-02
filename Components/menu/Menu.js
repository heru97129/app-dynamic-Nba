import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../menu/menustyle.module.scss"

 export default   function Menu({}) {
      return (
      <div className={styles['menu-container']}>
       <div className={styles['menu-container__logo']}>
         <Image src={"/images/logo.png"} width={120} height={70}/>
       </div>
       <div className={styles['menu-container__pages']}>
         <ul>
        <Link href={'/'} key={'home'}><li>Home</li></Link>  
        <Link href={'/teams'} key={'home'}> <li>Conference East</li></Link> 
          <li>Conference West</li>
          <li>Seasons</li>

         </ul>
       </div>
       <div className={styles['menu-container__signup']}>

       </div>


      </div>
      );
    }
  
  