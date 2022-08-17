import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import { Footer, Socials, NewsLetterForm, SubscribeForm } from '../components'
import { getSocials } from '../services';
import { useState } from 'react';
import { decode } from 'html-entities';
import News from '../components/news';
import Image from 'next/image'
import newStyles from '../styles/newsletterPage.module.css'





const newsletter = ({ socials }) => {

  return (
    <div>
      <Head>
        <title>Newsletter - Lumen</title>
      </Head>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={newStyles.headerWrapper}>
        <p className={newStyles.headerSubtext}>Things you need to know, things you need to be reminded of — Everything, curated to help you live your best life.</p>
        <div className={newStyles.headerContainer}>
          <div className={newStyles.HeroWrapper}>
            <News />
          </div>
          <div className={newStyles.headerText}>
            <h1 className={newStyles.header}>Daily mails to <span> brighten your day.</span></h1>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className={newStyles.subscribeFormWrapper}>
        <SubscribeForm />
      </div>
      <div className={newStyles.promptWrapper}>
        <h2 className={newStyles.prompt}>Join a growing number of extraordinary individuals making the best of each day!</h2>
      </div>
      <div className={styles.socialsNewsletter}>      
        <h4 className={styles.socialsHeader}>Connect with us on Social Media —</h4>
        <div className={styles.socialLinksWrapper}>
          {socials?.map((social) => <div className={styles.socialLinks} key={social.node.platform}><Socials social={social.node} /> </div>)}
        </div>
        <hr />
        <div>
          <p className={newStyles.copyright}>Copyright (c) 2022 AITHERIOS MEDIA</p>
        </div>
      </div>
    </div>
  )
}

export default newsletter

export async function getStaticProps() {
  const socials = (await getSocials()) || [];
  return {
    props: { socials }
  }
}