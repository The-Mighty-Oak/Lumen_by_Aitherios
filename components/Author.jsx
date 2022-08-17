import React from 'react'
import Image from 'next/image'
import authorStyles from '../styles/author.module.css'


const Author = ({ author }) => {
    return (
        <div className ={authorStyles.authorInfoContainer}>
            <div className={authorStyles.authorIntro}>
                <h3>Post by</h3>
            </div>
            <div className={authorStyles.authorProfile}>
                <div className={authorStyles.authorImage}>
                    <Image 
                        src={author.photo.url}
                        alt={author.name}
                        height={200}
                        width={200}
                        layout="responsive"
                    />
                </div>
                <div className={authorStyles.authorAbout}>
                    <div className={authorStyles.authorName}>
                        <p className="">{author.name}</p>
                    </div>
                    <div className={authorStyles.authorBio}>
                        <p className="">{author.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Author