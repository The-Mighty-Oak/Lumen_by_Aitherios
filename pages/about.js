import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import moment from 'moment'
import Iframe from 'react-iframe'
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer';
import articleStyle from '../styles/article.module.css'
import { RWebShare } from "react-web-share";
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import {  Footer, Socials } from '../components'
// import { getSocials } from '../services';
import { getAbout } from '../services'
import AboutDetails from '../components/AboutDetails'
import { getAboutAndSocials } from '../services'
import AuthorDetails from '../components/AuthorDetails'




const about = ({ socials }) => {
  return (
    <div>
      <Head>
        <title>About - Lumen</title>
      </Head>
      <div className={styles.navbar}>
          <Navbar />
      </div>
      
      <div className={styles.aboutSectionContainer}>
        <div className={styles.aboutSection}>
          {socials?.aboutLumen_Connection?.edges.map((about) => <div className={styles.socialLinks} key={about.node.id}><AboutDetails about={about.node}  /> </div>)}
        </div>

        <div className={styles.writersSection}>
          <div className={styles.writersSectionHeader}>
            <h3>Meet the Team</h3>
          </div>
          <div className={styles.writers}>
            {socials?.authorsConnection?.edges.map((writer) => <div className={styles.writerInfo} key={writer.node.name} ><AuthorDetails writer={writer.node} /> </div>)}
          </div>
        </div>
      </div>

      <div className={styles.footerSectionWrapper}>
        <div className={styles.socialsSectionWrapper}>
          <h4 className={styles.socialsHeader}>Connect with us on Social Media —</h4>
          <div className={styles.socialLinksWrapper}>
            {socials?.socialsConnection?.edges.map((social) => <div className={styles.socialLinks} key={social.node.platform}><Socials social={social.node} /> </div>)}
          </div>
          <hr />
        </div>
        
        <Footer />
      </div>
    </div>
  )
}

export default about

export async function getStaticProps() {
    const socials = (await getAboutAndSocials()) || [];
    return {
        props: { socials }
    }
}