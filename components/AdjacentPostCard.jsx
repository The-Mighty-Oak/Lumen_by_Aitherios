import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import APCStyle from '../styles/adjacentPostCard.module.css';
import ArrowRight from './ArrowRight';
import { Ellipsis } from 'react-row-ellipsis';



const AdjacentPostCard = ({ post, position }) => {


return (
    <div className={APCStyle.sectionContainer}>
       
        <div className={[APCStyle.previous, 'goPost'].join(' ')}>  
            <a href={`/post/${post.slug}`} className={APCStyle.to}>
                    {position === 'LEFT' && (
                        <div className={APCStyle.previousPostWrapper}>
                            <div className={APCStyle.leftArrow}>
                                <ArrowRight />
                            </div>
                            <div>
                                {/* <p className={APCStyle.createdAt}>{moment(post.createdAt).format('MMM DD, YYYY')}</p> */}
                                <div className={APCStyle.postTitle}>
                                    <Ellipsis lines={2} as='p' >
                                        {post.title}
                                    </Ellipsis>
                                </div>
                            </div>
                        </div>
                    )}
            </a>
        </div>

        <div className={[APCStyle.next, 'goPost'].join(' ')}>
            <a href={`/post/${post.slug}`} className={APCStyle.to}>
                {position === 'RIGHT' && (
                    <div className={APCStyle.nextPostWrapper}>
                        <div className={APCStyle.rightArrow}>
                            <ArrowRight />
                        </div>
                        <div>
                            <div className={APCStyle.info}>
                                {/* <p className={APCStyle.createdAt}>{moment(post.createdAt).format('MMM DD, YYYY')}</p> */}
                                <div className={APCStyle.postTitle}>
                                        <div className={APCStyle.postTitle}>
                                            <Ellipsis lines={2} as='p' >
                                                {post.title}
                                            </Ellipsis>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </a>
        </div>
        
    </div>
);
}

export default AdjacentPostCard;