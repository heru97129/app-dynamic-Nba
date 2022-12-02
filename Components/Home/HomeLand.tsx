import React from "react";
import Menu  from '../menu/Menu.js'
import Layout from '../../Components/layout/Layout.js'
import Image from "next/image.js";
import styles from '../Home/homelandstyle.module.scss'
export default function HomeLand({}) {
  return (
    <div>
    <Layout >
      <div className={styles['container-home']}>
        <div className={styles['container-home__image']}>
     <Image  src={'/images/kobe2.png'} width={700} height={800} key={'kobe'} alt={""}/>
     </div>
     <div className={styles['container-home__text']}>
        <h1>THE NBA OFFICIEL DATA SERVICES <br /> FACT CHECKING LIKE YOU <br /> NEVER SEEN BEFORE</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas sit voluptates repudiandae officiis quo? Culpa, impedit accusantium minima, iure provident quidem ducimus et illum totam laborum amet alias laboriosam blanditiis?</p>
     </div> 

     </div>
    </Layout>
    </div>
  );
}
  