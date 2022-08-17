import React from 'react'
import Image from 'next/image'
import moment from 'moment'
import Iframe from 'react-iframe'
import Link from 'next/link'
import { RichText } from '@graphcms/rich-text-react-renderer';
import articleStyle from '../styles/article.module.css'
import { RWebShare } from "react-web-share";
import CategoryIcon from "./CategoryIcon";
import CalenderIcon from "./CalenderIcon";
import ShareIcon from './ShareIcon';
import SecondShareIcon from './SecondShareIcon';


const PostDetail = ({ post }) => {

    return (
    <div className={articleStyle.articleSectionWrapper}>
        <article className={articleStyle.articleContainer}>
            <div className={articleStyle.headers}>
                <div>
                    
                    <div className={articleStyle.metInfo}>
                        <div className={articleStyle.categoryWrapper}>
                            <div className={articleStyle.categoryIcon}>
                                <CategoryIcon />
                            </div>
                            {post?.categories.map((category) => (
                                    <a key={category.slug} href={`/category/${category.slug}`}>
                                        <p className={articleStyle.categories}>
                                                {category.name}
                                        </p>
                                    </a>
                            ))}
                        </div>
                            <div className={articleStyle.createdAtWrapper}>
                            <div className={articleStyle.createdAtIcon}>
                                <CalenderIcon />
                            </div>
                            <p className={articleStyle.createdAt}>{moment(post.createdAt).format('DD MMM, YYYY')}</p>
                        </div>
                    </div>

                    <h1 className={articleStyle.title}> {post.title} </h1>
                </div>

                <div className={articleStyle.headersShare}>
                    <RWebShare
                        data={{
                            text: "Share Post,",
                            url: post.slug,
                            title: "Share",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <button className={[articleStyle.shareFirst, "shareFirstPostDetail"].join(' ')}>
                            <a>
                                <ShareIcon />
                            </a>
                        </button>
                    </RWebShare>
                </div>
            </div>
                <div className={articleStyle.featuredImage}>
                    <Image
                        src={post.featuredImage.url}
                        alt={post.title}
                        width={1209}
                        height={665}
                        layout="responsive"
                    />
                </div>
            <p className={articleStyle.excerpt}>{post.excerpt}</p>
         
            <div className={articleStyle.richText}>
                <RichText 
                    content={post.content.json.children}     
                    renderers={{
                        h1: ({ children }) => <h1 className={articleStyle.title}>{children}</h1>,
                        h2: ({ children }) => <h2 className={articleStyle.headerTwo}>{children}</h2>,
                        h3: ({ children }) => <h3 className={articleStyle.headerThree}>{children}</h3>,
                        h4: ({ children }) => <h4 className={articleStyle.headerFour}>{children}</h4>,
                        h5: ({ children }) => <h5 className={articleStyle.headerFive}>{children}</h5>,
                        h6: ({ children }) => <h6 className={articleStyle.headerSix}>{children}</h6>,
                        bold: ({ children }) => <strong>{children}</strong>,
                        italic: ({ children }) => <em>{children}</em>,
                        underline: ({ children }) => <u>{children}</u>,
                        p: ({ children }) => <p className={articleStyle.paragraph}>{children}</p>,
                        a: ({ children, openInNewTab, href, rel, ...rest }) => {
                            if (href.match(/^https?:\/\/|^\/\//i)) {
                                return (
                                    <a
                                        className={articleStyle.links}
                                        href={href}
                                        target={openInNewTab ? '_blank' : '_self'}
                                        rel={rel || 'noopener noreferrer'}
                                        {...rest}  
                                    >
                                        {children}
                                    </a>
                                )}
                        },
                        blockquote: ({ children }) => <p className={articleStyle.blockQuotes}>{children}</p>,
                        img: ({ src, altText, width, height }) => {
                            return (
                                    <Image
                                        className={articleStyle.Images}
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
                                    className={articleStyle.Iframe}
                                    display="initial"
                                    position="relative" />
                            )
                        }
                        
                    }}
                />
            </div>
        </article>

        <div className={articleStyle.sharePost}>
            <RWebShare
                data={{
                    text: "Share Post",
                    url: post.slug,
                    title: "Share this with someone you care about.",
                }}
            >
                    <button className={[articleStyle.sharePostButton, "sharePostButtonPostDetail"].join(' ')}>
                    <a>
                        <p className={articleStyle.sharePostText}>Share this Post</p>
                        <div className={[articleStyle.secondShareIconWrapper, 'secondSharePostDetailIconWrapper'].join(' ')}>
                            <SecondShareIcon />
                        </div>
                    </a>
                </button>
            </RWebShare>
        </div>
    </div>
    )
}

export default PostDetail