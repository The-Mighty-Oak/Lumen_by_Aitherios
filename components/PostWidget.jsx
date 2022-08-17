import React, {useState,useEffect} from "react"
import moment from "moment"
import Link from "next/link"
import { getRecentPosts, getSimilarPosts } from "../services";
import WidgetStyles from '../styles/Widget.module.css'
import Image from "next/image";
import CategoryIcon from "./CategoryIcon";
import CalenderIcon from "./CalenderIcon";
import { Ellipsis } from 'react-row-ellipsis';
import { useRouter } from 'next/router'

const PostWidget = ({ categories, slug }) => {
    const router = useRouter()
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if(slug){
            getSimilarPosts(categories, slug)
                .then((result) => setRelatedPosts(result))
        }else{
            getRecentPosts()
                .then((result) => setRelatedPosts(result))
        }
    }, [slug])



    return (
        <div className={WidgetStyles.sectionContainer}>
            <h3 className={WidgetStyles.sectionHeader}>
                {slug? 'Related Posts' : "Recent Posts"}
            </h3>
            <div className={WidgetStyles.postContainer}>
                {relatedPosts?.map((post) => (
                        <a href={`/post/${post.slug}`} key={post.title} className={WidgetStyles.post}>
                            <div className={WidgetStyles.postLeft}>
                                <div className={WidgetStyles.infoFirst}>
                                    <h2 className={WidgetStyles.titleFirst}>{post.title}</h2>
                                    <div className={WidgetStyles.metInfoFirst}>
                                        <div className={WidgetStyles.categoryWrapper}>
                                            <div className={WidgetStyles.categoryIcon}>
                                                <CategoryIcon />
                                            </div>
                                            {post?.categories.map((category) => (
                                                <button className={WidgetStyles.categoriesButton} key={category.slug} type="button" onClick={() => router.push(`/category/${category.slug}`)}>
                                                    <p className={WidgetStyles.categories}>
                                                        {category.name}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                        <div className={WidgetStyles.datePostedWrapper}>
                                            <div className={WidgetStyles.datePostedIcon}>
                                                <CalenderIcon />
                                            </div>
                                            <p className={WidgetStyles.datePosted}>
                                                {moment(post.createdAt).format('DD MMM, YYYY')}
                                            </p>
                                        </div>
                                    </div>    
                                </div>                
                                <div className={WidgetStyles.postImage}>
                                    <div className={WidgetStyles.Image}>
                                        <Image
                                            src={post.featuredImage.url}
                                            alt={post.featuredImage.fileName}
                                            width={670}
                                            height={369}
                                            layout="intrinsic" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={WidgetStyles.postInfo}>
                                <h2 className={WidgetStyles.titleBelow}>{post.title}</h2>
                                <div className={WidgetStyles.metInfo}>
                                    <div className={WidgetStyles.categoryWrapper}>
                                        <div className={WidgetStyles.categoryIcon}>
                                            <CategoryIcon />
                                        </div>
                                        {post?.categories.map((category) => (
                                            <button className={WidgetStyles.categoriesButton} key={category.slug} type="button" onClick={() => router.push(`/category/${category.slug}`)}>
                                                <p className={WidgetStyles.categories}>
                                                    {category.name}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                    <div className={WidgetStyles.datePostedWrapper}>
                                        <div className={WidgetStyles.datePostedIcon}>
                                            <CalenderIcon />
                                        </div>
                                        <p className={WidgetStyles.datePosted}>
                                            {moment(post.createdAt).format('DD MMM, YYYY')}
                                        </p>
                                    </div>
                                </div>

                                <Ellipsis lines={3} as='p' className={WidgetStyles.postExcerpt}>
                                    {post.excerpt}
                                </Ellipsis>
                                <div className={WidgetStyles.authorInfo}>
                                    <img
                                        src={post.authors.photo.url}
                                        height="50px" width="50px"
                                        alt={post.authors.name}
                                        className={WidgetStyles.authorImage}
                                    />
                                    <p className={WidgetStyles.authorName}>{post.authors.name}</p>
                                </div>
                            </div>
                        </a>
                ))}
            </div>
        </div>
    )
}

export default PostWidget