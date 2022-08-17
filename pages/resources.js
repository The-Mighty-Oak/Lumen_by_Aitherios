import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import { getSocials } from '../services';
import { Footer, Socials, SubscribeForm } from '../components'


const resources = ({socials}) => {
  return (
    <div className={styles.resourcesContainer}>
       <Head>
        <title>Newsletter - Lumen</title>
      </Head>
      <div className={styles.navbar}>
        <Navbar />
      </div>

      <div className={styles.contentWrapper}>
        <h2 className={styles.comingSoon}>Coming Soon</h2>
        <div className={styles.hl}> 
          <hr />
        </div>
        <div className={styles.vl}></div>
        <h1 className={styles.resourcesHeader}>
          <span className={styles.resourcesHeaderSpan}> A collection of helpful resources </span> — from recommendations on <span className={styles.resourcesHeaderSpan}>Impactful Books, to Great Courses and Podcasts</span> — to help you live your best life.
        </h1>
      </div>

      <div className={styles.resourcesSubscribeSection}>
        <p className={styles.callToAction} >Subscribe to get notified when this feature comes online.</p>
        <SubscribeForm />
      </div>

      <div className={styles.footerSectionWrapper}>
        <div className={styles.socialsSectionWrapper}>
          <h4 className={styles.socialsHeader}>Connect with us on Social Media —</h4>
          <div className={styles.socialLinksWrapper}>
            {socials?.map((social) => <div className={styles.socialLinks} key={social.node.platform}><Socials social={social.node} /> </div>)}
          </div>
          <hr />
        </div>
        <Footer />
        <div>
         
        </div>
      </div>

    </div>
  )
}

export default resources

export async function getStaticProps() {
  const socials = (await getSocials()) || [];

  return {
    props: { socials }
  }

}