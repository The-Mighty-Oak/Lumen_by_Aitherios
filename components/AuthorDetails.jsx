import React from 'react'
import Image from 'next/image'
import Iframe from 'react-iframe'
import { RichText } from '@graphcms/rich-text-react-renderer';
import ADStyles from '../styles/AboutDetails.module.css'



const AuthorDetails = ({writer}) => {
    // console.log(writer.featuredImage.url);
  return (
    <div className={ADStyles.AuthorSection}>
          <div className={ADStyles.writerDetails}>
              <h4 className={ADStyles.writerName}>{writer.name}</h4>
              <p className={ADStyles.writerPosition}>{writer.position}</p>
          </div>
        <div className={ADStyles.theTeam}>
            <div className={ADStyles.writerPhoto}>
                <Image
                    className={ADStyles.wImages}
                    alt={writer.featuredImage.fileName}
                    src={writer.featuredImage.url}
                    width={writer.featuredImage.width}
                    height={writer.featuredImage.height}
                    layout='responsive'
                />
            </div>
        </div>
        <div className={ADStyles.writerSocials}>
              {writer?.writersSocials.map((socials) => (
                  <a key={socials.id} href={socials.url} className={ADStyles.writerSocialsLinks}>
                        <div className={ADStyles.socialsPlatform}>
                            <p>
                                {socials.platform}
                            </p>
                        </div>
                        <div className={ADStyles.socialIcon}>
                          <Image
                            className={ADStyles.sIcon}
                            alt={socials.icon.fileName}
                            src={socials.icon.url}
                            width={30}
                            height={30}
                            layout='responsive'
                          />
                        </div>
                      </a>
                 
              ))}
        </div>

        <div className={ADStyles.richText}>
            <RichText
                content={writer.aboutMe.json.children}
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
                            )
                        }
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
                    iframe: ({ url, width, height }) => {
                        return (
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

export default AuthorDetails