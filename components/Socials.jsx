import React from 'react'
import Image from 'next/image';
import SocialStyles from '../styles/Socials.module.css'
import { motion, AnimatePresence } from "framer-motion"


const socialsVariant = {
    hover: {
        scale: 1.3,
        transition: { type: 'spring', stiffness: 100, duration: 0.1 }
    }
}

const Socials = ({ social }) => {
 
    return (
    <motion.div 
        className={SocialStyles.socialsContainer}
        whileHover="hover"
        variants={socialsVariant}>
            <a href={social.url} target="_blank" >
                <div className={SocialStyles.socialsIcons}>
                    <Image 
                        src={social?.icon.url}
                        alt={social?.icon.fileName}
                        width={40}
                        height={40}
                        layout="responsive"
                    />
                </div>
                <p className={SocialStyles.socialPlatform}> {social.platform} </p>
            </a>
    </motion.div>
    )
}

export default Socials