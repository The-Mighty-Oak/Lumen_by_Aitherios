import React from 'react'
import styles from '../styles/Home.module.css'

const ContactDetails = ({contact}) => {
  return (
    <div className={styles.contactChannel}>
      
      <a href={`mailto:${contact.channel}`}>{contact.channel}</a>
      
    </div>
  )
}

export default ContactDetails