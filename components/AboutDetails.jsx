import React from 'react'
import Image from 'next/image'
import Iframe from 'react-iframe'
import { RichText } from '@graphcms/rich-text-react-renderer';
import ADStyles from '../styles/AboutDetails.module.css'
import AboutPageHero from './AboutPageHero';



const AboutDetails = ({about}) => {
  
  return (

      <div className={ADStyles.aboutContentWrapper} >
        <div className={ADStyles.aboutHeader}>
            <div className={ADStyles.headerText}>{about.headerText}</div>
            <div className={ADStyles.hero}>
                <AboutPageHero />
            </div>
        </div>

    
        <div className={ADStyles.richTextAbout}>
            <RichText 
                content={about.aboutContent.json.children}     
                renderers={{
                    h1: ({ children }) => <h1 className={ADStyles.title}>{children}</h1>,
                    h2: ({ children }) => <h2 className={ADStyles.headerTwo}>{children}</h2>,
                    h3: ({ children }) => <h3 className={ADStyles.headerThree}>{children}</h3>,
                    h4: ({ children }) => <h4 className={ADStyles.headerFour}>{children}</h4>,
                    h5: ({ children }) => <h5 className={ADStyles.headerFive}>{children}</h5>,
                    h6: ({ children }) => <h6 className={ADStyles.headerSix}>{children}</h6>,
                    bold: ({ children }) => <strong>{children}</strong>,
                    italic: ({ children }) => <em>{children}</em>,
                    underline: ({ children }) => <u>{children}</u>,
                    p: ({ children }) => <p className={ADStyles.paragraph}>{children}</p>,
                    a: ({ children, openInNewTab, href, rel, ...rest }) => {
                        if (href.match(/^https?:\/\/|^\/\//i)) {
                            return (
                                <a
                                    className={ADStyles.links}
                                    href={href}
                                    target={openInNewTab ? '_blank' : '_self'}
                                    rel={rel || 'noopener noreferrer'}
                                    {...rest}  
                                >
                                    {children}
                                </a>
                            )}
                    },
                    blockquote: ({ children }) => <p className={ADStyles.blockQuotes}>{children}</p>,
                    img: ({ src, altText, width, height }) => {
                        return (
                                <Image
                                    className={ADStyles.Images}
                                    alt={altText}
                                    src={src}
                                    width={width}
                                    height={height}
                                    layout='responsive'
                                />
                            )
                    },
                    iframe: ({ url, width, height }) =>{
                        return(
                            <Iframe
                                url={url}
                                width={width}
                                height={height}
                                className={ADStyles.Iframe}
                                display="initial"
                                position="relative" />
                        )
                    }
                    
                }}
            />
        </div>
    

       
    </div>
  )
}

export default AboutDetails
