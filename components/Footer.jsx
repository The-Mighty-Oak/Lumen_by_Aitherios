import React from 'react'
import Image from 'next/image'
import footerStyles from '../styles/Footer.module.css' 
import { NewsLetterForm } from '.'
import FooterLogo from './FooterLogo'


const Footer = () => {
  return (
    <div className={footerStyles.footerWrapper}>
      <div className={footerStyles.footerLogo}>
        <FooterLogo />
      </div>
      <div className={footerStyles.NewsLetterForm}>
        <NewsLetterForm />
      </div>
      <div>
        <p className={footerStyles.copyright}>Copyright (c) 2022 AITHERIOS MEDIA</p>
      </div>
    </div>
  )
}

export default Footer
